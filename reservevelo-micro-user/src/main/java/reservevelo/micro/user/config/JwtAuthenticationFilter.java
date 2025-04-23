package reservevelo.micro.user.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            // Step 1: Extract JWT token from the request
            String jwt = parseJwt(request);

            // Step 2: If a token is present, validate it
            if (jwt != null && StringUtils.hasText(jwt)) {
                // Step 3: Extract username from token
                String username = jwtUtils.extractUsername(jwt);

                // Step 4: If username is valid and no authentication exists in the security context
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Step 5: Load user details from UserDetailsService
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    // Step 6: Validate the token with the username
                    if (jwtUtils.validateToken(jwt, username)) {
                        // Step 7: Create authentication object
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );

                        // Step 8: Add additional details to the authentication
                        authentication.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );

                        // Step 9: Set authentication in the security context
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        log.debug("Successfully authenticated user: {}", username);
                    }
                }
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e.getMessage());
        }

        // Step 10: Continue with the filter chain
        filterChain.doFilter(request, response);
    }

    /**
     * Extract JWT token from the Authorization header.
     * The header should be in the format: "Bearer <token>"
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            // Extract token by removing "Bearer " prefix
            return headerAuth.substring(7);
        }

        return null;
    }
}