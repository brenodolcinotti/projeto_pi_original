package api;

import static spark.Spark.*;

import spark.Filter;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;

import model.EntradaEstoque;
import model.Manutencao;
import model.NovaSolicitacao;
import model.SaidaEstoque;
import dao.dao;
import dao.postDAO;
import dao.putDAO;

public class Api {

    private static final Gson gson = new Gson();
    private static final dao dao = new dao();
    private static final postDAO postDAO = new postDAO();
    private static final putDAO putDAO = new putDAO();

    private static final String APPLICATION_JSON = "application/json";
    
    public static void main(String[] args) {
        
        port(1111);

        after(new Filter() {
            @Override
            public void handle(Request request, Response response){
                response.type(APPLICATION_JSON);
            }
        });

        // gets
        get("/entrada-estoque", (request, response) -> {
            return gson.toJson(dao.listarEntradaEstoque());
        });
        
        get("/saida-estoque", (request, response) -> {
            return gson.toJson(dao.listarSaidaEstoque());
        });

         get("/nova-solicitacao", (request, response) -> {
            return gson.toJson(dao.listarNovaSolicitacao());
        });

        get("/pendente", (request, response) -> {
            return gson.toJson(dao.listarSolicitacaoPendente());
        });
        
        get("/manutencao", (request, response) -> {
            return gson.toJson(dao.listarManutencao());
        });

        //post
        post("/entrada-estoque", (request, response) -> {
            try{
                EntradaEstoque entrada = gson.fromJson(request.body(), EntradaEstoque.class);
                postDAO.inserirNoEstoque(entrada);

                response.status(201);
                return gson.toJson(entrada);
            }catch (Exception e){
                response.status(500);
                System.err.println("Erro ao processar requisição post" + e.getMessage());
                e.printStackTrace();
                return "Erro ao criar categoria";
            }
        });

         post("/saida-estoque", (request, response) -> {
            try{
                SaidaEstoque saida = gson.fromJson(request.body(), SaidaEstoque.class);
                postDAO.retirarDoEstoque(saida);

                response.status(201);
                return gson.toJson(saida);
            }catch (Exception e){
                response.status(500);
                System.err.println("Erro ao processar requisição post" + e.getMessage());
                e.printStackTrace();
                return "Erro ao criar categoria";
            }
        });

        post("/manutencao", (request, response) -> {
            try{
                Manutencao manutencao = gson.fromJson(request.body(), Manutencao.class);
                postDAO.inserirManutencao(manutencao);

                response.status(201);
                return gson.toJson(manutencao);
            }catch (Exception e){
                response.status(500);
                System.err.println("Erro ao processar requisição post" + e.getMessage());
                e.printStackTrace();
                return "Erro";
            }
        });


        
        post("/nova-solicitacao", (request, response) -> {
            try{
                NovaSolicitacao nova = gson.fromJson(request.body(), NovaSolicitacao.class);
                postDAO.novaSolicitacao(nova);

                response.status(201);
                return gson.toJson(nova);
            }catch (Exception e){
                response.status(500);
                System.err.println("Erro ao processar requisição post" + e.getMessage());
                e.printStackTrace();
                return "Erro";
            }
        });

        //put
            put("/nova-solicitacao/:id",(request, response) ->  {
                try {
                    Long id = Long.parseLong(request.params(":id")); // Usa Long

                    NovaSolicitacao nova = gson.fromJson(request.body(), NovaSolicitacao.class);
                    nova.setId(id); // garante que o ID da URL seja usado

                    putDAO.atualizar(nova);

                    response.status(200); // OK
                    return gson.toJson(nova);

                } catch (NumberFormatException e) {
                    response.status(400); // Bad Request
                    return "{\"mensagem\": \"Formato de ID inválido.\"}";
                } catch (Exception e) {
                    response.status(500);
                    System.err.println("Erro ao processar requisição PUT: " + e.getMessage());
                    e.printStackTrace();
                    return "{\"mensagem\": \"Erro ao atualizar produto.\"}";
                }
        });


        // CORS para fazer a api funcionar
        options("/*", (request, response) -> {

            String reqHeaders = request.headers("Access-Control-Request-Headers");
            if (reqHeaders != null) {
                response.header("Access-Control-Allow-Headers", reqHeaders);
            }

            String reqMethod = request.headers("Access-Control-Request-Method");
            if (reqMethod != null) {
                response.header("Access-Control-Allow-Methods", reqMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            response.header("Access-Control-Allow-Headers", "*");
        });

        after((req, res) -> res.type(APPLICATION_JSON));
        System.out.println("API iniciada na porta 1111. Acesse: http://localhost:1111");

    }
}
