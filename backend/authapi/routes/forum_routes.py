from flask import Blueprint, request, jsonify
from bson import ObjectId
from datetime import datetime
import db

# Create Blueprint
forum_bp = Blueprint('forum', __name__)

# ---------------------------
# Posts Routes
# ---------------------------

@forum_bp.route("/posts", methods=["GET", "OPTIONS"])
def get_forum_posts():
    """Get all forum posts with optional filtering"""
    if request.method == "OPTIONS":
        return '', 200

    print(f"[ROUTE] GET /forum/posts from {request.remote_addr} query={dict(request.args)}")
    
    try:
        category = request.args.get('category', 'All')
        limit = int(request.args.get('limit', 50))
        skip = int(request.args.get('skip', 0))
        search = request.args.get('search', '')
        
        query = {}
        if category and category != "All":
            query["category"] = category
        
        if search:
            query["$or"] = [
                {"title": {"$regex": search, "$options": "i"}},
                {"content": {"$regex": search, "$options": "i"}},
                {"username": {"$regex": search, "$options": "i"}}
            ]
        
        posts = list(db.posts_collection.find(query)
                    .sort("created_at", -1)
                    .skip(skip)
                    .limit(limit))
        
        # Helper to serialize BSON types (ObjectId, datetime) and lists
        def _serialize_doc(doc):
            for k, v in list(doc.items()):
                if isinstance(v, ObjectId):
                    doc[k] = str(v)
                elif isinstance(v, list):
                    doc[k] = [str(x) if isinstance(x, ObjectId) else (x.isoformat() if isinstance(x, datetime) else x) for x in v]
                elif isinstance(v, datetime):
                    doc[k] = v.isoformat()
            return doc

        posts = [_serialize_doc(post) for post in posts]
            
        return jsonify({
            "success": True,
            "posts": posts,
            "total": db.posts_collection.count_documents(query)
        }), 200
        
    except Exception as e:
        print(f"Error getting posts: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@forum_bp.route("/posts/<post_id>", methods=["GET", "OPTIONS"])
def get_single_post(post_id):
    """Get a single post by ID"""
    if request.method == "OPTIONS":
        return '', 200
    
    try:
        post = db.posts_collection.find_one({"_id": ObjectId(post_id)})
        
        if not post:
            return jsonify({"success": False, "error": "Post not found"}), 404
        
        db.posts_collection.update_one(
            {"_id": ObjectId(post_id)},
            {"$inc": {"views": 1}}
        )
        
        # Serialize BSON types to JSON-safe types
        def _serialize_doc(doc):
            for k, v in list(doc.items()):
                if isinstance(v, ObjectId):
                    doc[k] = str(v)
                elif isinstance(v, list):
                    doc[k] = [str(x) if isinstance(x, ObjectId) else (x.isoformat() if isinstance(x, datetime) else x) for x in v]
                elif isinstance(v, datetime):
                    doc[k] = v.isoformat()
            return doc

        post = _serialize_doc(post)
        
        return jsonify({"success": True, "post": post}), 200
        
    except Exception as e:
        print(f"Error getting post: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@forum_bp.route("/posts", methods=["POST", "OPTIONS"])
def create_forum_post():
    """Create a new forum post"""
    if request.method == "OPTIONS":
        return '', 200
    
    try:
        data = request.json
        print(f"[ROUTE] /forum/posts POST from {request.remote_addr} data:", data)
        if not data or not isinstance(data, dict):
            print("[ROUTE] /forum/posts POST missing or invalid JSON body", data)
            return jsonify({"success": False, "error": "JSON body required"}), 400
        
        required_fields = ["title", "content", "category", "user_id"]
        if not all(field in data for field in required_fields):
            print("[ROUTE] Missing required fields in POST /forum/posts", data)
            return jsonify({"success": False, "error": "Missing required fields"}), 400
        
        user = db.users_collection.find_one({"_id": ObjectId(data["user_id"])})
        if not user:
            print(f"[ROUTE] User not found for id: {data.get('user_id')}")
            return jsonify({"success": False, "error": "User not found"}), 404
        
        post_data = {
            "user_id": ObjectId(data["user_id"]),
            "username": user.get("name", "Anonymous"),
            "user_avatar": user.get("photoProfile", ""),
            "title": data["title"],
            "content": data["content"],
            "category": data["category"],
            "replies": 0,
            "views": 0,
            "likes": 0,
            "liked_by": [],
            "is_pinned": False,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = db.posts_collection.insert_one(post_data)
        print(f"[ROUTE] Inserted post id: {result.inserted_id}")
        
        created_post = db.posts_collection.find_one({"_id": result.inserted_id})
        # Serialize new post doc
        def _serialize_doc(doc):
            for k, v in list(doc.items()):
                if isinstance(v, ObjectId):
                    doc[k] = str(v)
                elif isinstance(v, list):
                    doc[k] = [str(x) if isinstance(x, ObjectId) else (x.isoformat() if isinstance(x, datetime) else x) for x in v]
                elif isinstance(v, datetime):
                    doc[k] = v.isoformat()
            return doc
        created_post = _serialize_doc(created_post)
        
        return jsonify({
            "success": True,
            "message": "Post created successfully",
            "post": created_post
        }), 201
        
    except Exception as e:
        print(f"Error creating post: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@forum_bp.route("/posts/<post_id>/like", methods=["POST", "OPTIONS"])
def like_forum_post(post_id):
    """Like/unlike a post"""
    if request.method == "OPTIONS":
        return '', 200
    
    try:
        data = request.json
        
        if "user_id" not in data:
            return jsonify({"success": False, "error": "User ID required"}), 400
        
        post = db.posts_collection.find_one({"_id": ObjectId(post_id)})
        if not post:
            return jsonify({"success": False, "error": "Post not found"}), 404
        
        user_id = ObjectId(data["user_id"])
        liked_by = post.get("liked_by", [])
        
        if user_id in liked_by:
            db.posts_collection.update_one(
                {"_id": ObjectId(post_id)},
                {
                    "$pull": {"liked_by": user_id},
                    "$inc": {"likes": -1},
                    "$set": {"updated_at": datetime.utcnow()}
                }
            )
            liked = False
        else:
            db.posts_collection.update_one(
                {"_id": ObjectId(post_id)},
                {
                    "$addToSet": {"liked_by": user_id},
                    "$inc": {"likes": 1},
                    "$set": {"updated_at": datetime.utcnow()}
                }
            )
            liked = True
        
        updated_post = db.posts_collection.find_one({"_id": ObjectId(post_id)})
        # Serialize updated post
        def _serialize_doc(doc):
            for k, v in list(doc.items()):
                if isinstance(v, ObjectId):
                    doc[k] = str(v)
                elif isinstance(v, list):
                    doc[k] = [str(x) if isinstance(x, ObjectId) else (x.isoformat() if isinstance(x, datetime) else x) for x in v]
                elif isinstance(v, datetime):
                    doc[k] = v.isoformat()
            return doc
        updated_post = _serialize_doc(updated_post)
        
        return jsonify({
            "success": True,
            "liked": liked,
            "likes": updated_post["likes"],
            "post": updated_post
        }), 200
        
    except Exception as e:
        print(f"Error liking post: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

# ---------------------------
# Comments Routes
# ---------------------------

@forum_bp.route("/comments", methods=["POST", "OPTIONS"])
def create_comment():
    """Create a new comment"""
    if request.method == "OPTIONS":
        return '', 200
    
    try:
        data = request.json
        print(f"[ROUTE] /forum/comments POST from {request.remote_addr} data:", data)
        if not data or not isinstance(data, dict):
            print("[ROUTE] /forum/comments POST missing or invalid JSON body", data)
            return jsonify({"success": False, "error": "JSON body required"}), 400
        
        required_fields = ["post_id", "content", "user_id"]
        if not all(field in data for field in required_fields):
            print("[ROUTE] Missing required fields in POST /forum/comments", data)
            return jsonify({"success": False, "error": "Missing required fields"}), 400
        
        user = db.users_collection.find_one({"_id": ObjectId(data["user_id"])})
        if not user:
            return jsonify({"success": False, "error": "User not found"}), 404
        
        comment_data = {
            "user_id": ObjectId(data["user_id"]),
            "username": user.get("name", "Anonymous"),
            "user_avatar": user.get("photoProfile", ""),
            "post_id": ObjectId(data["post_id"]),
            "content": data["content"],
            "likes": 0,
            "liked_by": [],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = db.comments_collection.insert_one(comment_data)
        
        db.posts_collection.update_one(
            {"_id": ObjectId(data["post_id"])},
            {"$inc": {"replies": 1}}
        )
        
        created_comment = db.comments_collection.find_one({"_id": result.inserted_id})
        created_comment["_id"] = str(created_comment["_id"])
        created_comment["user_id"] = str(created_comment["user_id"])
        created_comment["post_id"] = str(created_comment["post_id"])
        
        return jsonify({
            "success": True,
            "message": "Comment created successfully",
            "comment": created_comment
        }), 201
        
    except Exception as e:
        print(f"Error creating comment: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@forum_bp.route("/posts/<post_id>/comments", methods=["GET", "OPTIONS"])
def get_post_comments(post_id):
    """Get all comments for a post"""
    if request.method == "OPTIONS":
        return '', 200
    
    try:
        comments = list(db.comments_collection.find({"post_id": ObjectId(post_id)})
                       .sort("created_at", 1))
        
        # Serialize comment docs
        def _serialize_doc(doc):
            for k, v in list(doc.items()):
                if isinstance(v, ObjectId):
                    doc[k] = str(v)
                elif isinstance(v, list):
                    doc[k] = [str(x) if isinstance(x, ObjectId) else (x.isoformat() if isinstance(x, datetime) else x) for x in v]
                elif isinstance(v, datetime):
                    doc[k] = v.isoformat()
            return doc

        comments = [_serialize_doc(comment) for comment in comments]
        
        return jsonify({
            "success": True,
            "comments": comments
        }), 200
        
    except Exception as e:
        print(f"Error getting comments: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@forum_bp.route("/comments/<comment_id>/like", methods=["POST", "OPTIONS"])
def like_comment(comment_id):
    """Like/unlike a comment"""
    if request.method == "OPTIONS":
        return '', 200
    
    try:
        data = request.json
        
        if "user_id" not in data:
            return jsonify({"success": False, "error": "User ID required"}), 400
        
        comment = db.comments_collection.find_one({"_id": ObjectId(comment_id)})
        if not comment:
            return jsonify({"success": False, "error": "Comment not found"}), 404
        
        user_id = ObjectId(data["user_id"])
        liked_by = comment.get("liked_by", [])
        
        if user_id in liked_by:
            db.comments_collection.update_one(
                {"_id": ObjectId(comment_id)},
                {
                    "$pull": {"liked_by": user_id},
                    "$inc": {"likes": -1},
                    "$set": {"updated_at": datetime.utcnow()}
                }
            )
            liked = False
        else:
            db.comments_collection.update_one(
                {"_id": ObjectId(comment_id)},
                {
                    "$addToSet": {"liked_by": user_id},
                    "$inc": {"likes": 1},
                    "$set": {"updated_at": datetime.utcnow()}
                }
            )
            liked = True
        
        updated_comment = db.comments_collection.find_one({"_id": ObjectId(comment_id)})
        updated_comment["_id"] = str(updated_comment["_id"])
        updated_comment["user_id"] = str(updated_comment["user_id"])
        updated_comment["post_id"] = str(updated_comment["post_id"])
        
        return jsonify({
            "success": True,
            "liked": liked,
            "likes": updated_comment["likes"],
            "comment": updated_comment
        }), 200
        
    except Exception as e:
        print(f"Error liking comment: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

# ---------------------------
# Forum Stats
# ---------------------------

@forum_bp.route("/stats", methods=["GET", "OPTIONS"])
def get_forum_stats():
    """Get forum statistics"""
    if request.method == "OPTIONS":
        return '', 200
    
    try:
        total_posts = db.posts_collection.count_documents({})
        total_comments = db.comments_collection.count_documents({})
        total_users = db.users_collection.count_documents({})
        
        return jsonify({
            "success": True,
            "stats": {
                "total_posts": total_posts,
                "total_comments": total_comments,
                "total_users": total_users,
                "online_users": 24
            }
        }), 200
        
    except Exception as e:
        print(f"Error getting stats: {e}")
        return jsonify({"success": False, "error": str(e)}), 500