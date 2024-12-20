<?php

namespace App\Http\Controllers;

use App\Models\Attendances;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

use function Symfony\Component\HttpFoundation\filter;

class AttendanceController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:absensi index', only: ['index']),
            new Middleware('permission:absensi create', only: ['create', 'store']),
            new Middleware('permission:absensi edit', only: ['edit', 'update']),
            new Middleware('permission:absensi delete', only: ['destroy']),
        ];
    }


    static function isTodaySubmitted(): bool
    {
        return Attendances::where('user_id', auth()->user()->id)
            ->whereDate('created_at', now()->toDateString())
            ->exists();
    }

    public function index(Request $request)
    {
        $absensi = Attendances::with('user')->latest()->paginate(6)->withQueryString();

        return inertia('Absensi/Index', ['absensi' => $absensi,'filters' => $request->only(['search'])]);
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
