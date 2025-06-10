<?php

namespace App\Controller\Resolvers;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CartResolver
{
    private static ?ObjectType $cartItemAttributeType = null;
    private static ?ObjectType $cartItemType = null;
    private static ?ObjectType $cartType = null;

    public static function getCartItemAttributeType(): ObjectType
    {
        if (!self::$cartItemAttributeType) {
            self::$cartItemAttributeType = new ObjectType([
                'name' => 'CartItemAttribute',
                'fields' => [
                    'key' => Type::nonNull(Type::string()),
                    'value' => Type::nonNull(Type::string()),
                ],
            ]);
        }
        return self::$cartItemAttributeType;
    }

    public static function getCartItemType(): ObjectType
    {
        if (!self::$cartItemType) {
            self::$cartItemType = new ObjectType([
                'name' => 'CartItem',
                'fields' => [
                    'productId' => Type::nonNull(Type::int()),
                    'name' => Type::nonNull(Type::string()),
                    'price' => Type::nonNull(Type::float()),
                    'quantity' => Type::nonNull(Type::int()),
                    'attributes' => Type::listOf(self::getCartItemAttributeType()),
                    'total' => Type::nonNull(Type::float()),
                ],
            ]);
        }
        return self::$cartItemType;
    }

    public static function getCartType(): ObjectType
    {
        if (!self::$cartType) {
            self::$cartType = new ObjectType([
                'name' => 'Cart',
                'fields' => [
                    'items' => Type::listOf(self::getCartItemType()),
                    'total' => Type::nonNull(Type::float()),
                ],
            ]);
        }
        return self::$cartType;
    }

    // 👉 Groza iegūšana (te vēlāk varam ielikt arī datubāzes vaicājumu)
    public static function getCart(): array
    {
        session_start();
        $cart = $_SESSION['cart'] ?? [];

        $items = [];
        $total = 0;

        foreach ($cart as $key => $item) {
            $itemTotal = $item['price'] * $item['quantity'];

            $attributesList = [];
            foreach ($item['attributes'] ?? [] as $k => $v) {
                $attributesList[] = ['key' => $k, 'value' => $v];
            }

            $items[] = [
                'productId' => $item['productId'],
                'name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'attributes' => $attributesList,
                'total' => $itemTotal,
            ];

            $total += $itemTotal;
        }

        return [
            'items' => $items,
            'total' => $total,
        ];
    }
}