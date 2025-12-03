package model;

public class Manutencao {

    private long id;
    private String item;
    private int tempo_manutencao;
    private String data_manutencao;
    private String setor;
    private String observacao;
    private String responsavel;
    private String tipo;

    public Manutencao(String item, int tempo_manutencao, String data_manutencao, String setor, String observacao,
            String responsavel, String tipo) {
        this.item = item;
        this.tempo_manutencao = tempo_manutencao;
        this.data_manutencao = data_manutencao;
        this.setor = setor;
        this.observacao = observacao;
        this.responsavel = responsavel;
        this.tipo = tipo;
    }

    public Manutencao(long id, String item, int tempo_manutencao, String data_manutencao, String setor,
            String observacao, String responsavel, String tipo) {
        this.id = id;
        this.item = item;
        this.tempo_manutencao = tempo_manutencao;
        this.data_manutencao = data_manutencao;
        this.setor = setor;
        this.observacao = observacao;
        this.responsavel = responsavel;
        this.tipo = tipo;
    }

    public Manutencao() {
    }
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getItem() {
        return item;
    }
    public void setItem(String item) {
        this.item = item;
    }
    public int getTempo_manutencao() {
        return tempo_manutencao;
    }
    public void setTempo_manutencao(int tempo_manutencao) {
        this.tempo_manutencao = tempo_manutencao;
    }
    public String getData_manutencao() {
        return data_manutencao;
    }
    public void setData_manutencao(String data_manutencao) {
        this.data_manutencao = data_manutencao;
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
    public String getResponsavel() {
        return responsavel;
    }
    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "Manutencao [id=" + id + ", item=" + item + ", tempo_manutencao=" + tempo_manutencao
                + ", data_manutencao=" + data_manutencao + ", setor=" + setor + ", observacao=" + observacao
                + ", responsavel=" + responsavel + ", tipo=" + tipo + "]";
    }

    
    

    
    
}
