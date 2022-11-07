<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Todo;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //generating factory
        $user = Category::factory(5)
        ->has(
            Todo::factory()->count(3)
            ->state(function (array $attributes, Category $category) {
                return ['category_id' => $category->id];
            })
        )
            ->create();
    }
}
