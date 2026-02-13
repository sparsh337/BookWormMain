package com.example.config;

import com.example.model.Customer;
import com.example.repository.RegistrationRepository;
import com.example.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Autowired
    private RegistrationRepository registrationRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    @org.springframework.context.annotation.Lazy
    private PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");
        Customer customer = registrationRepository.findByUserMail(email).orElseGet(() -> {
            Customer newCustomer = new Customer();
            newCustomer.setUserMail(email);
            newCustomer.setUserName(name);
            newCustomer.setPassword(passwordEncoder.encode("google_auth_dummy_password"));
            newCustomer.setProfileImage(picture);
            return registrationRepository.save(newCustomer);
        });
        String token = jwtUtil.generateToken(customer.getUserMail(), customer.getRole());
        String redirectUrl = "http://localhost:3000/oauth2/redirect?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
