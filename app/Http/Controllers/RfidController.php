<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RfidController extends Controller
{
    public function read(Request $request)
    {
        $user = User::where('uid', $request->uid)->exists();
        if ($user) {
            return response()->json([
                'status' => 'exists',
                'message' => 'Rfid Terdaftar',
                'uid' => $request->uid
            ]);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'Rfid success',
                'uid' => $request->uid,
            ]);
        }
    }
}
