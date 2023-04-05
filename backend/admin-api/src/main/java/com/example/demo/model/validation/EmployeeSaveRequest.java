package com.example.demo.model.validation;

import com.example.demo.model.Employee;
import com.example.demo.utils.validators.AllowedRoles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.validation.constraints.*;;
import java.util.Collection;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeSaveRequest {
    @NotEmpty(message = "The name is required")
    @Size(min = 3, max = 20, message = "The name must be between 3 and 20 characters.")
    private String name;
    @NotEmpty(message = "The username is required")
    @Size(min = 5, max = 12, message = "The username must be between 5 and 12 characters.")
    private String username;
    @NotEmpty(message = "The password is required")
    @Size(min = 3, max = 20, message = "The password must be between 3 and 20 characters")
    private String password;
    @NotEmpty
    @Email(message = "The email must be a valid one.")
    private String email;
    @NotEmpty
    @AllowedRoles
    private Collection<String> roles;
    public Employee toEmployee(){
        return new Employee(name, username, password, email, roles);
    }

}
