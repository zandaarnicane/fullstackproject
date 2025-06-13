<?php

namespace App\Controller\Resolvers;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CartResolver
{
    private static ?ObjectType $cartItemAttributeType = null;
    private static ?ObjectType $cartItemType = null;
    private static ?ObjectType $cartType = null;

    private static function startSession(): void {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }
    }

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

    public static function getCart(): array
    {
        self::startSession();
        $cart = $_SESSION['cart'] ?? [];

        $items = [];
        $total = 0;

        foreach ($cart as $item) {
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

    public static function addToCart(
        int $productId,
        int $quantity,
        string $name,
        float $price,
        array $attributes = [],
        float $total = 0
    ): array {
        self::startSession();
        $cart = $_SESSION['cart'] ?? [];

        // Pārvēršam atribūtus uz sakārtotu key => value
        ksort($attributes);

        foreach ($cart as &$item) {
            $itemAttrs = $item['attributes'] ?? [];
            ksort($itemAttrs);

            if ($item['productId'] === $productId && $itemAttrs == $attributes) {
                $item['quantity'] += $quantity;
                $item['total'] = $item['price'] * $item['quantity'];
                $_SESSION['cart'] = $cart;
                return self::getCart();
            }
        }

        $cart[] = [
            'productId' => $productId,
            'name' => $name,
            'price' => $price,
            'quantity' => $quantity,
            'attributes' => $attributes,
            'total' => $total ?: ($price * $quantity),
        ];

        $_SESSION['cart'] = $cart;
        return self::getCart();
    }

    public static function updateCartItem(
        int $productId,
        int $quantity,
        string $name = '',
        float $price = 0,
        array $attributes = [],
        float $total = 0
    ): array {
        self::startSession();
        $cart = $_SESSION['cart'] ?? [];

        ksort($attributes);

        foreach ($cart as &$item) {
            $itemAttrs = $item['attributes'] ?? [];
            ksort($itemAttrs);

            if ($item['productId'] === $productId && $itemAttrs == $attributes) {
                $item['quantity'] = $quantity;
                $item['total'] = $item['price'] * $quantity;
                break;
            }
        }

        $_SESSION['cart'] = $cart;
        return self::getCart();
    }

    public static function clearCart(): void
    {
        self::startSession();
        $_SESSION['cart'] = [];
    }
}
