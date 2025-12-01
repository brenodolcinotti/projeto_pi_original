package model;

public class EntradaEstoque {
    
    private long id;
    private String nome_produto;
    private int quantidade;
    private String data_entrada;
    private String setor;
    private String observacao;

    public EntradaEstoque(String nome_produto, int quantidade, String data_entrada, String setor, String observacao) {
        this.nome_produto = nome_produto;
        this.quantidade = quantidade;
        this.data_entrada = data_entrada;
        this.setor = setor;
        this.observacao = observacao;
    }

    public EntradaEstoque(long id, String nome_produto, int quantidade, String data_entrada, String setor,
            String observacao) {
        this.id = id;
        this.nome_produto = nome_produto;
        this.quantidade = quantidade;
        this.data_entrada = data_entrada;
        this.setor = setor;
        this.observacao = observacao;
    }

    public EntradaEstoque() {
    }
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getNome_produto() {
        return nome_produto;
    }
    public void setNome_produto(String nome_produto) {
        this.nome_produto = nome_produto;
    }
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    public String getData_entrada() {
        return data_entrada;
    }
    public void setData_entrada(String data_entrada) {
        this.data_entrada = data_entrada;
    }
    public String getSetor() {
        return setor;
    }
    public void setSetor(String setor) {
        this.setor = setor;
    }
    public String getObservacao() {
        return observacao;
    }
    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    @Override
    public String toString() {
        return "EntradaEstoque [id=" + id + ", nome_produto=" + nome_produto + ", quantidade=" + quantidade
                + ", data_entrada=" + data_entrada + ", setor=" + setor + ", observacao=" + observacao + "]";
    }
    

    
}
