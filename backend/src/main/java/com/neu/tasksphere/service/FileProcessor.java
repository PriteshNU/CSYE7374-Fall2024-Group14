package com.neu.tasksphere.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public abstract class FileProcessor<T> {
    public List<T> processFile(MultipartFile file) {
        List<T> resultList = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                T processedItem = processLine(line);
                resultList.add(processedItem);
            }
        } catch (IOException e) {
            handleException(e);
        }
        return resultList;
    }

    protected abstract T processLine(String line);

    protected void handleException(Exception e) {
        e.printStackTrace(); // Default implementation
    }
}
