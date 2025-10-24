package com.tallerpro.service.util;

import java.util.Objects;

public final class ServiceUtils {
    private ServiceUtils() {}
    public static <T> T requireNonNull(T value, String message){
        if (Objects.isNull(value)) throw new IllegalArgumentException(message);
        return value;
    }
}
