package com.mockcertified.app;

import com.getcapacitor.BridgeActivity;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import android.os.Bundle; // required for onCreate parameter

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(GoogleAuth.class);
    registerPlugin(
      com.getcapacitor.community.facebooklogin.FacebookLogin.class
    );
  }
}