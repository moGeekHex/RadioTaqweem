package com.perfectfit.qurankareem;


import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.PowerManager;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.JobIntentService;
import android.util.Log;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.jstasks.HeadlessJsTaskEventListener;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.jstasks.HeadlessJsTaskContext;

import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

public class BackgroundTask extends JobIntentService implements HeadlessJsTaskEventListener {
    private static final int JOB_ID = 1337;
    private final Set<Integer> mActiveTasks = new CopyOnWriteArraySet<>();
    private static @Nullable PowerManager.WakeLock sWakeLock;
private static volatile Object lock = new Object();
    static void enqueueWork(Context context, Intent work) {
        Log.d("HEADLESS JS JOB", "ENQUEUE WORK");
        enqueueWork(context, BackgroundTask.class, JOB_ID, work);
    }

    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "WidgetTask",
                extras != null ? Arguments.fromBundle(extras) : null,
                5000);
    }

    @Override
    protected void onHandleWork(@NonNull Intent intent) {
        final HeadlessJsTaskConfig taskConfig = getTaskConfig(intent);
        if (taskConfig != null) {
            UiThreadUtil.runOnUiThread(
                    new Runnable() {
                        @Override
                        public void run() {
        final ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
                            invokeStartTask(reactContext,taskConfig);
                        }
                    }
            );
        }
    }

    public static void acquireWakeLockNow(Context context) {
        if (sWakeLock == null || !sWakeLock.isHeld()) {
            PowerManager powerManager =
                    Assertions.assertNotNull((PowerManager) context.getSystemService(POWER_SERVICE));
            sWakeLock = powerManager.newWakeLock(
                    PowerManager.PARTIAL_WAKE_LOCK,
                    BackgroundTask.class.getSimpleName());
            sWakeLock.setReferenceCounted(false);
            sWakeLock.acquire();
        }
    }


    private void invokeStartTask(ReactContext reactContext, final HeadlessJsTaskConfig taskConfig) {
        final HeadlessJsTaskContext headlessJsTaskContext = HeadlessJsTaskContext.getInstance(reactContext);
        headlessJsTaskContext.addTaskEventListener(this);

        UiThreadUtil.runOnUiThread(
                new Runnable() {
                   @Override
                    public void run() {

                       if(!mActiveTasks.isEmpty()){
                           return ;
                       }

                       if(headlessJsTaskContext.hasActiveTasks()){
                           return;
                       }
                        int taskId = headlessJsTaskContext.startTask(taskConfig);
                        mActiveTasks.add(taskId);
                            }
                }
        );
    }

    protected void startTask(final HeadlessJsTaskConfig taskConfig) {
        UiThreadUtil.assertOnUiThread();
        acquireWakeLockNow(this);
        final ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
        if (reactContext == null) {
            reactInstanceManager
                    .addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                        @Override
                        public void onReactContextInitialized(ReactContext reactContext) {
                            invokeStartTask(reactContext, taskConfig);
                            reactInstanceManager.removeReactInstanceEventListener(this);
                        }
                    });
            if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
                reactInstanceManager.createReactContextInBackground();
            }
        } else {
            invokeStartTask(reactContext, taskConfig);
        }
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        super.onDestroy();

        if (getReactNativeHost().hasInstance()) {
            ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
            if (reactContext != null) {
                HeadlessJsTaskContext headlessJsTaskContext =
                        HeadlessJsTaskContext.getInstance(reactContext);
                headlessJsTaskContext.removeTaskEventListener(this);
            }
        }
        if (sWakeLock != null) {
            sWakeLock.release();
        }
    }

    protected ReactNativeHost getReactNativeHost() {
        return ((ReactApplication) getApplication()).getReactNativeHost();
    }
    @Override
    public void onHeadlessJsTaskStart(int taskId) {

    }

    @Override
    public void onHeadlessJsTaskFinish(int taskId) {

    }
}