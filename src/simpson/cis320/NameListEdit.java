package simpson.cis320;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());

    private Pattern namePattern;
    private Pattern emailPattern;
    private Pattern phonePattern;
    private Pattern birthdayPattern;

    public NameListEdit() {
        // --- Compile and set up all the regular expression patterns here ---
        namePattern = Pattern.compile("^([^0-9,:()?*&\\^%$#@!+=\\[\\]{}~\\\\|;:<>,\\/]){1,45}$");
        emailPattern = Pattern.compile("[^@]+@[^\\.]+\\..+");
        phonePattern = Pattern.compile("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
        birthdayPattern = Pattern.compile("^[0-9]{4}-(1[0-2]|[1-9]|0[1-9])-(3[0-1]|[1-2][0-9]|0[1-9]|[1-9])$");

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Just confirm we are calling the servlet we think we are
        System.out.println("JSON Post");

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Output the string we got as a request, just as a check
        out.println(requestString);

        // Great! Now we want to use GSON to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Gson gson = new Gson();

        Person temp = gson.fromJson(requestString, Person.class);

        Matcher matchFirst = namePattern.matcher(temp.getFirst());
        Matcher matchLast = namePattern.matcher(temp.getLast());
        Matcher matchEmail = emailPattern.matcher(temp.getEmail());
        Matcher matchPhone = phonePattern.matcher(temp.getPhone());
        Matcher matchBirthday = birthdayPattern.matcher(temp.getBirthday());

        if(!matchFirst.find())
        {
            System.out.println("There is a problem with the first name. Please fix it.");
            return;
        }
        if(!matchLast.find())
        {
            System.out.println("There is a problem with the last name. Please fix it.");
            return;
        }
        if(!matchEmail.find())
        {
            System.out.println("There is a problem with the email. Please fix it.");
            return;
        }
        if(!matchPhone.find())
        {
            System.out.println("There is a problem with the phone number. Please fix it.");
            return;
        }
        if(!matchBirthday.find())
        {
            System.out.println("There is a problem with the birthday. Please fix it.");
            return;
        }

        // Declare our variables
        Connection conn = null;
        PreparedStatement stmt = null;
        String sql;

        // Databases are unreliable. Use some exception handling
        System.out.println("starting connection");
        try {
            // Get our database connection
            conn = DBHelper.getConnection();

            System.out.println(temp.getId());
            // This is a string that is our SQL query
            if(temp.getId() == 0)
            {
                System.out.println("New id");
                sql = "INSERT INTO person (first, last, email, phone, birthday) VALUES (?, ?, ?, ? ,?);";
                stmt = conn.prepareStatement(sql);
                stmt.setString(1, temp.getFirst());
                stmt.setString(2, temp.getLast());
                stmt.setString(3, temp.getEmail());
                stmt.setString(4, temp.getPhone().replace("-", ""));
                stmt.setString(5, temp.getBirthday());
            }
            else
            {
                System.out.println("Old id");
                sql = "UPDATE person SET first=?, last=?, email=?, phone=?, birthday=? WHERE id=?";
                stmt = conn.prepareStatement(sql);
                stmt.setString(1, temp.getFirst());
                stmt.setString(2, temp.getLast());
                stmt.setString(3, temp.getEmail());
                stmt.setString(4, temp.getPhone().replace("-", ""));
                stmt.setString(5, temp.getBirthday());
                stmt.setString(6, Integer.toString(temp.getId()));
            }
            // Execute the SQL and get the results
            System.out.println(sql);
            stmt.executeUpdate();
            } catch (SQLException se) {
                log.log(Level.SEVERE, "SQL Error", se );
            } catch (Exception e) {
                log.log(Level.SEVERE, "Error", e );
            } finally {
            // Ok, close our result set, statement, and connection
            try { stmt.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
            try { conn.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
        }
    }
}