import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { useCart } from '@/contexts/CartContext';
import { Fonts, Palette } from '@/constants/theme';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';


export default function Checkout() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { user } = useUser();
  const [loading, setLoading] = React.useState(false);
  const [showReceipt, setShowReceipt] = React.useState(false);
  const [receiptData, setReceiptData] = React.useState<any>(null);
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₱{item.price} x {item.quantity}</Text>

        {/* Quantity controls */}
        <View style={styles.quantityRow}>
          <TouchableOpacity
  style={[styles.quantityBtn]}
  onPress={() => updateQuantity(item.id, item.quantity - 1)}
  disabled={item.quantity <= 1}
  activeOpacity={0.7} // React Native default, gives a pressed effect
>
  <Text style={styles.quantityText}>-</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.quantityBtn]}
  onPress={() => updateQuantity(item.id, item.quantity + 1)}
  activeOpacity={0.7}
>
  <Text style={styles.quantityText}>+</Text>
</TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text style={styles.removeBtn}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: Palette.deepObsidian }]}>
      <Text style={styles.heading}>Checkout</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: ₱{total}</Text>

          <TouchableOpacity
  onPress={async () => {
  if (loading) return; // prevent double-clicks
  setLoading(true);

  if (!user?.email) {
    Alert.alert('Error', 'You must be logged in to checkout.');
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/checkout', {
      email: user.email,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: total,
    });

    if (response.data.success) {
  const receiptSnapshot = [...cart];

  // ✅ Include transaction_id from backend
  setReceiptData({ 
    items: receiptSnapshot, 
    total, 
    transaction_id: response.data.transaction_id 
  });

  setShowReceipt(true);
  clearCart();
} else {
  Alert.alert('Error', 'Checkout failed.');
}
  } catch (err) {
    console.error(err);
    Alert.alert('Error', 'Failed to process checkout.');
  } finally {
    setLoading(false);
  }
}}
  style={[styles.payButton, { backgroundColor: Palette.warmCopper }]}
  disabled={loading}
>
  <Text style={styles.payButtonText}>
    {loading ? "Processing..." : "Pay Now"}
  </Text>
</TouchableOpacity>
        </View>
      )}

{showReceipt && receiptData && (
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>✅ Payment Successful!</Text>

      <FlatList
        data={receiptData.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.modalItem}>
            <Text style={styles.modalItemText}>
              {item.name} x {item.quantity} — ₱{item.price * item.quantity}
            </Text>
          </View>
        )}
      />

      <Text style={styles.modalTotal}>Grand Total: ₱{receiptData.total}</Text>
      <Text style={styles.modalTotal}>Transaction ID: {receiptData.transaction_id}</Text>

      <TouchableOpacity
        style={[styles.payButton, { marginTop: 12 }]}
        onPress={() => setShowReceipt(false)}
      >
        <Text style={styles.payButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    marginBottom: 24,
    color: Palette.linenWhite,
  },
  emptyText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: Palette.slate,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.charcoalEspresso,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  productName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Palette.linenWhite,
  },
  productPrice: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Palette.slate,
    marginTop: 4,
  },
  removeBtn: {
    fontFamily: Fonts.bold,
    color: '#ef4444',
    fontSize: 14,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
 quantityBtn: {
  backgroundColor: Palette.warmCopper, // 🔥 changed from stoneGray
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  ...Platform.select({
    ios: {
      shadowColor: Palette.warmCopper,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: `0 2px 6px ${Palette.warmCopper}40`,
      transition: 'background-color 0.2s',
    },
  }),
},
quantityText: {
  color: Palette.linenWhite, // keep + and - white
  fontFamily: Fonts.bold,
  fontSize: 16,
},
  quantityNumber: {
    color: Palette.linenWhite,
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginHorizontal: 12,
  },
  footer: {
    marginTop: 16,
  },
  total: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 12,
    color: Palette.linenWhite,
  },
  payButton: {
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},
modalContainer: {
  width: '85%',
  maxHeight: '80%',
  backgroundColor: Palette.charcoalEspresso,
  borderRadius: 16,
  padding: 24,
},
modalTitle: {
  fontFamily: Fonts.bold,
  fontSize: 20,
  marginBottom: 12,
  color: Palette.linenWhite,
},
modalItem: {
  paddingVertical: 4,
  borderBottomWidth: 1,
  borderBottomColor: Palette.stoneGray,
},
modalItemText: {
  fontFamily: Fonts.medium,
  fontSize: 16,
  color: Palette.linenWhite,
},
modalTotal: {
  fontFamily: Fonts.bold,
  fontSize: 18,
  marginTop: 12,
  color: Palette.linenWhite,
},
});