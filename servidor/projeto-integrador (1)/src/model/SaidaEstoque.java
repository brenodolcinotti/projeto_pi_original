package model;

public class SaidaEstoque {
    private long id;
    private String nome_produto;
    private int quantidade;
    private String data_saida;
    private String setor;
    private String observacao;

    public SaidaEstoque(String nome_produto, int quantidade, String data_saida, String setor, String observacao) {
        this.nome_produto = nome_produto;
        this.quantidade = quantidade;
        this.data_saida = data_saida;
        this.setor = setor;
        this.observacao = observacao;
    }

    public SaidaEstoque(long id, String nome_produto, int quantidade, String data_saida, String setor,
            String observacao) {
        this.id = id;
        this.nome_produto = nome_produto;
        this.quantidade = quantidade;
        this.data_saida = data_saida;
        this.setor = setor;
        this.observacao = observacao;
    }

    public SaidaEstoque() {
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
    public String getdata_saida() {
        return data_saida;
    }
    public void setdata_saida(String data_saida) {
        this.data_saida = data_saida;
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
        return "SaidaEstoque [id=" + id + ", nome_produto=" + nome_produto + ", quantidade=" + quantidade
                + ", data_saida=" + data_saida + ", setor=" + setor + ", observacao=" + observacao + "]";
    }
    
    
}
