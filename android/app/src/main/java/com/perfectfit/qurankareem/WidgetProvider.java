package com.perfectfit.qurankareem;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.RemoteViews;
import android.widget.Toast;

public class WidgetProvider extends AppWidgetProvider {
    private static final String WIDGET_TASK = "com.androidwidgetpoc.WIDGET_TASK";

    /*
     * When enabled on screen, let the BackgroundTaskBridge
     * manipulate it from javascript
     */

    @Override
    public void onEnabled(Context context) {
        Log.d("WIDGET_PROVIDER", "En onEnabled");
//        Intent serviceIntent = new Intent(context, BackgroundTask.class);
//        if(android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
//            context.startForegroundService(serviceIntent);
//        }else{
//            context.startService(serviceIntent);
//        }

       // HeadlessJsTaskService.acquireWakeLockNow(context);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);
        Mawaqeet.Salah salah =  Mawaqeet.salah(context);
        RemoteViews widgetView = new RemoteViews(context.getPackageName(), R.layout.widget);
        widgetView.setTextViewText(R.id.txt_fajer,salah.fajer);
        widgetView.setTextViewText(R.id.txt_sunrise,salah.sunrise);
        widgetView.setTextViewText(R.id.txt_dhuhur,salah.dhuhur);
        widgetView.setTextViewText(R.id.txt_asr,salah.asr);
        widgetView.setTextViewText(R.id.txt_maghreb,salah.maghreb);
        widgetView.setTextViewText(R.id.txt_Ishaa, salah.Ishaa);





//        Intent launchActivity = new Intent(this.getReactApplicationContext(), MainActivity.class);
//        PendingIntent pendingIntent = PendingIntent.getActivity(this.getReactApplicationContext(), 0, launchActivity, 0);
//        widgetView.setOnClickPendingIntent(R.id.yetiLogo, pendingIntent);

        appWidgetManager.updateAppWidget(new ComponentName(context, WidgetProvider.class), widgetView);


    }

    @Override
    public void onReceive(final Context context, final Intent incomingIntent) {
        super.onReceive(context, incomingIntent);
//        Intent serviceIntent = new Intent(context, BackgroundTask.class);
//        serviceIntent.putExtras(incomingIntent);
//
//        if(android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
//            context.startForegroundService(serviceIntent);
//        }else{
//            context.startService(serviceIntent);
//        }
//        RemoteViews widgetView = new RemoteViews(context.getPackageName(), R.layout.widget);
//    PendingIntent pendingIntent = PendingIntent.getService(context,1000,serviceIntent,PendingIntent.FLAG_UPDATE_CURRENT);
//        widgetView.setOnClickPendingIntent(R.id.reload,pendingIntent);
       // Intent silentStartIntent = new Intent(context, BackgroundTask.class);
       // context.startService(silentStartIntent);

        /*
         * Proxy bundle extras towards the service
         * */


     //   BackgroundTask.enqueueWork(context,incomingIntent);


    }
}