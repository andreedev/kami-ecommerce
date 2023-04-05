package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("test")
public class TestController {
    @Autowired
    PasswordEncoder passwordEncoder;
    @GetMapping("encrypt/{str}")
    public String encrypt(@PathVariable("str") String str){
        return passwordEncoder.encode(str);
    }

}
