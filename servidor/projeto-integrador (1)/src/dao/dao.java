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

public class dao {
    // read entrada estoque
    public List<EntradaEstoque> listarEntradaEstoque(){

        List<EntradaEstoque> entrada = new ArrayList<>();

        String sql = "SELECT * FROM entrada_estoque";

        try (Connection conn = ConnectionFactory.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery()
        ) {
            while(rs.next()){
                EntradaEstoque entradaEstoque = new EntradaEstoque(
                    rs.getLong("id"), 
                    rs.getString("nome_produto"), 
                    rs.getInt("quantidade"), 
                    rs.getString("data_entrada"), 
                    rs.getString("setor"), 
                    rs.getString("observacao")
                    );
                    entrada.add(entradaEstoque);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar dados de entrada de estoque: " + e.getMessage());
            e.printStackTrace();        
        }
        return entrada;
    }

     // read saida estoque
    public List<SaidaEstoque> listarSaidaEstoque(){

        List<SaidaEstoque> saida = new ArrayList<>();

        String sql = "SELECT * FROM saida_estoque";

        try (Connection conn = ConnectionFactory.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery()
        ) {
            while(rs.next()){
                SaidaEstoque saidaEstoque = new SaidaEstoque(
                    rs.getLong("id"), 
                    rs.getString("nome_produto"), 
                    rs.getInt("quantidade"), 
                    rs.getString("data_saida"), 
                    rs.getString("setor"), 
                    rs.getString("observacao")
                    );
                    saida.add(saidaEstoque);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar dados de saida de estoque: " + e.getMessage());
            e.printStackTrace();        
        }
        return saida;
    }

     // read nova solicitacao
    public List<NovaSolicitacao> listarNovaSolicitacao(){

        List<NovaSolicitacao> nova = new ArrayList<>();

        String sql = "SELECT * FROM nova_solicitacao";

        try (Connection conn = ConnectionFactory.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery()
        ) {
            while(rs.next()){
                NovaSolicitacao novaSolicitacao = new NovaSolicitacao(
                    rs.getLong("id"), 
                    rs.getString("item"), 
                    rs.getString("data_solicitacao"), 
                    rs.getString("setor"), 
                    rs.getString("observacao"), 
                    rs.getString("responsavel")
                    );
                    nova.add(novaSolicitacao);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar dados de novas solicitações: " + e.getMessage());
            e.printStackTrace();        
        }
        return nova;
    }

    // read manutencao
    public List<Manutencao> listarManutencao(){

        List<Manutencao> manutencao = new ArrayList<>();

        String sql = "SELECT * FROM manutencao";

        try (Connection conn = ConnectionFactory.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery()
        ) {
            while(rs.next()){
                Manutencao manutencaoNova = new Manutencao(
                    rs.getLong("id"), 
                    rs.getString("item"), 
                    rs.getInt("tempo_manutencao"), 
                    rs.getString("data_manutencao"),
                    rs.getString("setor"), 
                    rs.getString("observacao"), 
                    rs.getString("responsavel")
                    );
                    manutencao.add(manutencaoNova);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar dados de manutencao: " + e.getMessage());
            e.printStackTrace();        
        }
        return manutencao;
    }

    
}
