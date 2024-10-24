<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PlanCompradoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $compra;

    public function __construct($compra)
    {
        $this->compra = $compra;
    }

    public function build()
    {
        return $this->subject('Tu Plan de Entrenamiento')
                    ->view('emails.plan')
                    ->with('compra', $this->compra);
    }
}
