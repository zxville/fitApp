<?php

namespace Database\Seeders;

// database/seeders/PlansTableSeeder.php
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlansTableSeeder extends Seeder
{
    public function run()
    {
        Plan::create([
            'title' => 'Entrenamiento en casa',
            'price' => 14000,
            'image' => 'https://s3.abcstatics.com/media/bienestar/2020/03/23/deporte-en-casa-k02C--1248x698@abc.jpg',
            'description' => "Rutina de ejercicios con videos (duración de 40') para 4 días en la semana. Con o sin elementos.",
        ]);
        Plan::create([
            'title' => 'Entrenamiento en gimnasio',
            'price' => 14000,
            'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSaT2B5P2uOqXtJjEwOulYiTFEfWHpjl9O_w&s',
            'description' => "Rutina de entrenamiento con videos (duración de 1 hr) para 4 días en la semana.",
        ]);
        Plan::create([
            'title' => 'Nutrición + entrenamiento',
            'price' => 20000,
            'image' => 'https://img.freepik.com/foto-gratis/comida-cruda-sana-pesa-gimnasia-superficie-madera_23-2147882036.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726963200&semt=ais_hybrid',
            'description' => "La combinación perfecta para lograr tus objetivos de forma rápida y permanente. Incluye: rutina de ejercicios modalidad hogar o gym + guía de alimentación saludable.",
        ]);
    }
}

