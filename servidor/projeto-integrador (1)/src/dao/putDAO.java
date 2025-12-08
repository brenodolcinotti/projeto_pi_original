package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.EntradaEstoque;
import model.Manutencao;
import model.NovaSolicitacao;
import model.SaidaEstoque;
import util.ConnectionFactory;

public class putDAO {

    // ------------------------------------
    // UPDATE
    // ------------------------------------
    public void atualizar(NovaSolicitacao nova) {
        String sql = "UPDATE nova_solicitacao SET status = ? WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, nova.getStatus());
            stmt.setLong(2, nova.getId()); // ID no WHERE

            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao atualizar solicitação ID: " + nova.getId() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
}
