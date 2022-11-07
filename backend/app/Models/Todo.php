<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'name', 'is_checked'];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
