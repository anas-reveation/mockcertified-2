package com.mockcertified.mockcertified;

import com.getcapacitor.BridgeActivity;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import android.os.Bundle; // required for onCreate parameter

import com.instabug.library.Instabug;
import com.instabug.library.invocation.InstabugInvocationEvent;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(GoogleAuth.class);
    registerPlugin(
      com.getcapacitor.community.facebooklogin.FacebookLogin.class
    );
    
    new Instabug.Builder(this.getApplication(), "036aa14d1f2d82a0b7619eef61e21583")
      .setInvocationEvents(InstabugInvocationEvent.SHAKE, InstabugInvocationEvent.SCREENSHOT)
      .build();
  }
}