package com.mygoogleloginapp

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.facebook.react.bridge.ActivityEventListener
import com.google.android.gms.tasks.Task
import com.google.android.gms.common.api.ApiException

class GoogleSignInModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private lateinit var googleSignInClient: GoogleSignInClient
    private var promise: Promise? = null
    private val RC_SIGN_IN = 9001

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "GoogleSignInModule"

    @ReactMethod
    fun signIn(promise: Promise) {
        val activity = reactApplicationContext.currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        this.promise = promise

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestIdToken("78919977610-e2b9milf5p6ts9im1puirttkp6qejnph.apps.googleusercontent.com")
            .build()

        googleSignInClient = GoogleSignIn.getClient(activity, gso)
        activity.startActivityForResult(googleSignInClient.signInIntent, RC_SIGN_IN)
    }

    // Only implement this method for RN 0.71+
    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            try {
                val account = task.getResult(ApiException::class.java)
                val map = Arguments.createMap()
                map.putString("id", account?.id)
                map.putString("name", account?.displayName)
                map.putString("email", account?.email)
                map.putString("idToken", account?.idToken)
                map.putString("photo", account?.photoUrl?.toString())
                promise?.resolve(map)
            } catch (e: ApiException) {
                promise?.reject("SIGN_IN_FAILED", e.message)
            }
        }
    }


    override fun onNewIntent(intent: Intent) {
    // Not needed for Google Sign-In, so leave empty
}

}
