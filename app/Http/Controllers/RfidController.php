<?php

namespace App\Http\Controllers;

use App\Events\RfidReadEvent;
use App\Models\User;
use Illuminate\Http\Request;

class RfidController extends Controller
{
    public function read(Request $request)
    {
        $user = User::where('uid', $request->uid)->exists();
        if ($user) {
            event(new RfidReadEvent($request->uid, 'exists', 'Rfid Terdaftar'));
            return response()->json([
                'status' => 'exists',
                'message' => 'Rfid Terdaftar',
                'uid' => $request->uid
            ]);
        } else {
            event(new RfidReadEvent($request->uid, 'success', 'Rfid Success'));

            return response()->json([
                'status' => 'success',
                'message' => 'Rfid success',
                'uid' => $request->uid,
            ]);
        }
    }
}
