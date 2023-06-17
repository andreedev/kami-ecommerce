package com.example.demo.service;

import com.example.demo.model.Category;
import com.example.demo.model.validation.CustomCategory;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.utils.Utils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.LocaleResolver;

import java.util.List;
import java.util.Locale;

@Service
public class LocaleServiceImpl implements LocaleService {

    @Autowired
    private MessageSource messageSource;
    public String getMessage(String code){
        return messageSource.getMessage(code, null, new Locale("es"));
    }

}
