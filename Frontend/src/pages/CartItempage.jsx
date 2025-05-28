import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    if (!isNaN(newQty) && newQty >= 1) {
      onQuantityChange(item.id, newQty);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-200 py-4 gap-4">
      {/* Product Image */}
      <div className="flex items-center gap-4 w-full sm:w-1/2">
        <div className="w-24 h-24 bg-neutral-100 overflow-hidden rounded">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-base font-medium text-neutral-800">
            {item.product.name}
          </h3>
          <p className="text-sm text-neutral-500">{item.product.color || '—'}</p>
          <p className="text-sm text-neutral-600 mt-1">
            ${item.product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-4">
        <label htmlFor={`qty-${item.id}`} className="sr-only">
          Quantity
        </label>
        <input
          id={`qty-${item.id}`}
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center border border-neutral-300 rounded py-1 px-2"
        />
      </div>

      {/* Subtotal and Remove Button */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-sm text-neutral-800">
          Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
