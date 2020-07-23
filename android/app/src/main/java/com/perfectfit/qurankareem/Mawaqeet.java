package com.perfectfit.qurankareem;

import android.content.Context;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Calendar;
import java.util.Date;

public class Mawaqeet {

       private static String FILE_NAME = "Salawat.json";
   static  Gson gson = new GsonBuilder().create();


    public  static class Salah{
  String day;
         String month;
         String fajer;
         String sunrise;
         String dhuhur;
         String asr;
         String maghreb;
         String Ishaa;
    }

    public static Salah salah(Context context){
        try {
       Salah[] list =   gson.fromJson( new InputStreamReader(context.getAssets().open(FILE_NAME)),Salah[].class);
       Date today = new Date();
       Calendar calendar =      Calendar.getInstance();

            for(Salah s :list ){

                if(Integer.parseInt(s.month) == calendar.get(Calendar.MONTH)+1 && Integer.parseInt(s.day) == calendar.get(Calendar.DAY_OF_MONTH)){
                    return s;
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
