package com.mungfluencer.global.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriMaker {

    /** private constructor. Protected to prevent direct instantiation. **/
    private UriMaker() { }

    /**
     * Return the {@code URI}
     * @param url defualt url of resource
     * @param resourceId Primary Key of resource
     * @return URI information of resource URI
     */
    public static URI getUri(String url, Long resourceId) {
        String path = url+ "/" + resourceId;
        return UriComponentsBuilder.fromPath(path).build().toUri();
    }
}
