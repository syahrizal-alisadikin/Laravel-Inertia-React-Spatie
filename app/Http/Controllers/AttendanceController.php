<?php

namespace App\Http\Controllers;

use App\Models\Attendances;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    static function isTodaySubmitted(): bool
    {
        return Attendances::where('user_id', auth()->user()->id)
            ->whereDate('created_at', now()->toDateString())
            ->exists();
    }
    public function submit(Request $request)
    {
        $request->validate([
            'selectedRoles' => 'required',
            'latitude'      => 'required',
            'longitude'     => 'required',
            'description'   => 'required_if:selectedRoles,sick,leave,permit'
        ]);
        Attendances::create([
            'status'        => $request->selectedRoles,
            'user_id'       => auth()->user()->id,
            'description'   => $request->description,
            'latitude'      => $request->latitude,
            'longitude'     => $request->longitude
        ]);
        return to_route('dashboard');
    }
}
