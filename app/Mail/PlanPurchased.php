<?php

namespace App\Mail;

use App\Models\Compra;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PlanPurchased extends Mailable
{
    use Queueable, SerializesModels;

    public $compra;

    public function __construct(Compra $compra)
    {
        $this->compra = $compra;
    }

    public function build()
    {
        $planFile = storage_path('app/public/plans/' . $this->compra->plan->file_name);

        return $this->subject('Tu Plan de Entrenamiento')
                    ->view('emails.plan_purchased')
                    ->attach($planFile)
                    ->with([
                        'plan' => $this->compra->plan,
                    ]);
    }
}
