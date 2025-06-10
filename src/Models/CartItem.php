<?php

namespace App\Models;

use App\Database;
use PDO;

class CartItem
{
    public static function getAllByUserId(Database $db, int $userId): array
    {
        return $db->query(
            'SELECT * FROM cart_items WHERE user_id = ?',
            [$userId]
        )->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function add(Database $db, int $userId, int $productId, int $quantity, array $attributes = []): array
    {
        $existing = $db->query(
            'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ? AND attributes = ?',
            [$userId, $productId, json_encode($attributes)]
        )->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            $newQty = $existing['quantity'] + $quantity;
            $db->query(
                'UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [$newQty, $existing['id']]
            );
        } else {
            $db->query(
                'INSERT INTO cart_items (user_id, product_id, quantity, attributes) VALUES (?, ?, ?, ?)',
                [$userId, $productId, $quantity, json_encode($attributes)]
            );
        }

        return ['success' => true];
    }

    public static function clear(Database $db, int $userId): void
    {
        $db->query('DELETE FROM cart_items WHERE user_id = ?', [$userId]);
    }

    public static function removeItem(Database $db, int $id, int $userId): void
    {
        $db->query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [$id, $userId]);
    }
}