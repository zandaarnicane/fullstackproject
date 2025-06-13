<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;
use App\Controller\Resolvers\OrderResolver;
use App\Controller\Types\OrderInputType;
use App\Controller\Resolvers\CartResolver;

class GraphQL {
    static public function handle() {
        try {
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'echo' => [
                        'type' => Type::string(),
                        'args' => [
                            'message' => ['type' => Type::string()],
                        ],
                        'resolve' => static fn ($rootValue, array $args): string => $rootValue['prefix'] . $args['message'],
                    ],
                    'cart' => [
                        'type' => CartResolver::getCartType(),
                        'resolve' => fn() => CartResolver::getCart(),
                    ],
                ],
            ]);

            $attributeInputType = new InputObjectType([
                'name' => 'CartItemAttributeInput',
                'fields' => [
                    'key' => Type::nonNull(Type::string()),
                    'value' => Type::nonNull(Type::string()),
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'addToCart' => [
                        'type' => CartResolver::getCartType(),
                        'args' => [
                            'productId' => Type::nonNull(Type::int()),
                            'name' => Type::nonNull(Type::string()),
                            'price' => Type::nonNull(Type::float()),
                            'quantity' => Type::nonNull(Type::int()),
                            'attributes' => Type::listOf($attributeInputType),
                            'total' => Type::nonNull(Type::float()),
                        ],
                        'resolve' => fn($root, $args) => CartResolver::addToCart(
                            $args['productId'],
                            $args['quantity'],
                            $args['name'],
                            $args['price'],
                            self::transformAttributes($args['attributes'] ?? []),
                            $args['total']
                        ),
                    ],
                    'updateCartItem' => [
                        'type' => CartResolver::getCartType(),
                        'args' => [
                            'productId' => Type::nonNull(Type::int()),
                            'quantity' => Type::nonNull(Type::int()),
                        ],
                        'resolve' => fn($root, $args) => CartResolver::updateCartItem(
                            productId: $args['productId'],
                            quantity: $args['quantity']
                        ),
                    ],
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn ($calc, array $args): int => $args['x'] + $args['y'],
                    ],
                    'placeOrder' => [
                        'type' => Type::string(),
                        'args' => [
                            'input' => ['type' => new OrderInputType()],
                        ],
                        'resolve' => function ($root, $args) {
                            return OrderResolver::store($args['input']);
                        },
                    ],
                ],
            ]);

            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery($queryType)
                ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }

    private static function transformAttributes(array $attributes): array
    {
        $result = [];
        foreach ($attributes as $attribute) {
            if (isset($attribute['key'], $attribute['value'])) {
                $result[$attribute['key']] = $attribute['value'];
            }
        }
        return $result;
    }
}
