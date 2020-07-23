package com.perfectfit.qurankareem;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.RemoteViews;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class BackgroundTaskBridge extends ReactContextBaseJavaModule {

    public BackgroundTaskBridge(final ReactApplicationContext reactContext) { super(reactContext); }

    @ReactMethod
    public void pinWidgetToHomeScreen () {
        Context context = this.getReactApplicationContext();

        ComponentName name = new ComponentName(context, WidgetProvider.class);
        int [] ids = AppWidgetManager.getInstance(context).getAppWidgetIds(name);

        Intent pickIntent = new Intent(AppWidgetManager.ACTION_APPWIDGET_PICK);
        pickIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, ids[0]);
        context.startActivity(pickIntent);
    }

    @Override
    public String getName() {
        return "BackgroundTaskBridge";
    }

    @ReactMethod
    public void taskResult(Boolean result) {
        RemoteViews views = new RemoteViews(this.getReactApplicationContext().getPackageName(), R.layout.widget);
        if (result == true) {
            Log.d("TASK_RESULT_TRUE", result.toString());
        } else {
            Log.d("TASK_RESULT_FALSE", result.toString());
        }
        AppWidgetManager.getInstance(this.getReactApplicationContext()).updateAppWidget(new ComponentName(this.getReactApplicationContext(), WidgetProvider.class), views);
    }

    @ReactMethod
    public void initializeWidgetBridge(ReadableMap  salah) {
        Log.d("BakgroundService",""+salah.toString());
        RemoteViews widgetView = new RemoteViews(this.getReactApplicationContext().getPackageName(), R.layout.widget);
        widgetView.setTextViewText(R.id.txt_fajer,salah.getString("fajer"));
        widgetView.setTextViewText(R.id.txt_sunrise,salah.getString("sunrise"));
        widgetView.setTextViewText(R.id.txt_dhuhur,salah.getString("dhuhur"));
        widgetView.setTextViewText(R.id.txt_asr,salah.getString("asr"));
        widgetView.setTextViewText(R.id.txt_maghreb,salah.getString("maghreb"));
        widgetView.setTextViewText(R.id.txt_Ishaa, salah.getString("Ishaa"));
        try {
            Toast.makeText(getReactApplicationContext(), "updateWidget", Toast.LENGTH_SHORT).show();
        }catch(Exception e){

        }




//        Intent launchActivity = new Intent(this.getReactApplicationContext(), MainActivity.class);
//        PendingIntent pendingIntent = PendingIntent.getActivity(this.getReactApplicationContext(), 0, launchActivity, 0);
//        widgetView.setOnClickPendingIntent(R.id.yetiLogo, pendingIntent);

        AppWidgetManager.getInstance(this.getReactApplicationContext()).updateAppWidget(new ComponentName(this.getReactApplicationContext(), WidgetProvider.class), widgetView);
    }




}