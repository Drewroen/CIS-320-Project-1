package simpson.cis320;

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

@WebServlet(name = "NameListDelete")
public class NameListDelete extends HttpServlet {
    private final static Logger log = Logger.getLogger(NameListDelete.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Just confirm we are calling the servlet we think we are
        System.out.println("ID Deletion");

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Output the string we got as a request, just as a check
        System.out.println(requestString);

        // Declare our variables
        Connection conn = null;
        PreparedStatement stmt = null;

        // Databases are unreliable. Use some exception handling
        System.out.println("starting connection");
        try {
            // Get our database connection
            conn = DBHelper.getConnection();

            // This is a string that is our SQL query.
            String sql = "DELETE FROM person WHERE id = ?;";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, requestString);

            // Execute the SQL and get the results
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