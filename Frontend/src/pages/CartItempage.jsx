// Beautiful Cart Item component
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const product = item?.product || item || {};
  const imageUrl = product.image || 'https://via.placeholder.com/150';
  const name = product.name || 'Unnamed Product';
  const price = parseFloat(product.price) || 0;
  const color = product.color || '—';
  const quantity = parseInt(item?.quantity, 10) || 1;
  const itemId = item?.id ?? product?.id ?? '';

  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    if (!isNaN(newQty) && newQty >= 1) {
      onQuantityChange(itemId, newQty);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-20 flex flex-col sm:flex-row items-center justify-between transition-transform transform hover:scale-[1.02] border border-neutral-200">
      {/* Product Image */}
      <div className="flex items-center gap-6 w-full sm:w-1/2">
        <div className="w-32 h-32 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-300">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-1">{name}</h3>
          <p className="text-sm text-neutral-500 mb-1">Color: {color}</p>
          <p className="text-md text-green-600 font-semibold">KSh {price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity & Remove */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mt-6 sm:mt-0">
        <div className="flex items-center gap-2">
          <label htmlFor={`qty-${itemId}`} className="text-sm font-medium text-neutral-700">Qty:</label>
          <input
            id={`qty-${itemId}`}
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 text-center border border-neutral-300 rounded-lg py-1 px-3 focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>
        <div className="flex flex-col items-end">
          <p className="text-md font-semibold text-neutral-800">
            Subtotal: KSh {(price * quantity).toFixed(2)}
          </p>
          <button
            onClick={() => onRemove(itemId)}
            className="mt-2 text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;