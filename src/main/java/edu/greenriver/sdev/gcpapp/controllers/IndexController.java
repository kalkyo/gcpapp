package edu.greenriver.sdev.gcpapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * A controller class the routes the user to the home page of the web app
 * @author Peter Eang
 * @version 1.0
 */
@Controller
public class IndexController
{
    /**
     * @return the main page of the application
     */
    @GetMapping("")
    public String home()
    {
        return "index";
    }
}
