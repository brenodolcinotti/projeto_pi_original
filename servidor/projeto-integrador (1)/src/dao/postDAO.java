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

public class postDAO {
    
    //create
    public void inserirNoEstoque(EntradaEstoque entrada){
        String sql = "INSERT INTO entrada_estoque (nome_produto, quantidade, data_entrada, setor, observacao) VALUES (?,?,?,?,?)";

        try (Connection conn = ConnectionFactory.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
    ){

        //definir as query
        stmt.setString(1, entrada.getNome_produto());
        stmt.setInt(2, entrada.getQuantidade());
        stmt.setString(4, entrada.getSetor());
        stmt.setString(3, entrada.getData_entrada());
        stmt.setString(5, entrada.getObservacao());

        stmt.executeUpdate();

        try(ResultSet rs = stmt.getGeneratedKeys()){
            if(rs.next()){
                entrada.setId(rs.getLong(1));
            }
        }
            
        } catch (SQLException e) {
            System.err.println("Erro ao inserir no estoque: " + entrada.getNome_produto() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    //==============================================================================================================
    //==============================================================================================================
    //==============================================================================================================

    public void retirarDoEstoque(SaidaEstoque saida){
        String sql = "INSERT INTO saida_estoque (nome_produto, quantidade, data_saida, setor, observacao) VALUES (?,?,?,?,?)";

        try (Connection conn = ConnectionFactory.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
    ){

        //definir as query
        stmt.setString(1, saida.getNome_produto());
        stmt.setInt(2, saida.getQuantidade());
        stmt.setString(4, saida.getSetor());
        stmt.setString(3, saida.getdata_saida());
        stmt.setString(5, saida.getObservacao());

        stmt.executeUpdate();

        try(ResultSet rs = stmt.getGeneratedKeys()){
            if(rs.next()){
                saida.setId(rs.getLong(1));
            }
        }
            
        } catch (SQLException e) {
            System.err.println("Erro ao inserir no estoque: " + saida.getNome_produto() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

     public void inserirManutencao(Manutencao manutencao){
        String sql = "INSERT INTO manutencao (item, tempo_manutencao, data_manutencao, setor, observacao, responsavel, tipo) VALUES (?,?,?,?,?,?,?)";

        try (Connection conn = ConnectionFactory.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)
    ){

        //definir as query
        stmt.setString(1, manutencao.getItem());
        stmt.setInt(2, manutencao.getTempo_manutencao());
        stmt.setString(3, manutencao.getData_manutencao());
        stmt.setString(4, manutencao.getSetor());
        stmt.setString(5, manutencao.getObservacao());
        stmt.setString(6, manutencao.getResponsavel());
        stmt.setString(7, manutencao.getTipo());

        stmt.executeUpdate();

        try(ResultSet rs = stmt.getGeneratedKeys()){
            if(rs.next()){
                manutencao.setId(rs.getLong(1));
            }
        }
            
        } catch (SQLException e) {
            System.err.println("Erro ao inserir: " + manutencao.getId()+ ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

