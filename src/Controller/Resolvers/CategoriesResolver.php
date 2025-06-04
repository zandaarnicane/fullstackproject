<?php

namespace App\Controller\Resolvers;

use App\Models\Category;

class CategoriesResolver
{
    public static function index(): array
    {
        return Category::all();
    }
}