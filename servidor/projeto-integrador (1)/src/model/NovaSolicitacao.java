package model;

public class NovaSolicitacao {
    
    private long id;
    private String item;
    private String data_solicitacao;
    private String setor;
    private String observacao;
    private String responsavel;
    private String status;


    public NovaSolicitacao(String item, String data_solicitacao, String setor, String observacao, String responsavel, String status) {
        this.item = item;
        this.data_solicitacao = data_solicitacao;
        this.setor = setor;
        this.observacao = observacao;
        this.responsavel = responsavel;
        this.status = status;
    }

    public NovaSolicitacao(long id, String item, String data_solicitacao, String setor, String observacao,
            String responsavel, String status) {
        this.id = id;
        this.item = item;
        this.data_solicitacao = data_solicitacao;
        this.setor = setor;
        this.observacao = observacao;
        this.responsavel = responsavel;
        this.status = status;
    }

    public NovaSolicitacao() {
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
    public String getData_solicitacao() {
        return data_solicitacao;
    }
    public void setData_solicitacao(String data_solicitacao) {
        this.data_solicitacao = data_solicitacao;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "NovaSolicitacao [id=" + id + ", item=" + item + ", data_solicitacao=" + data_solicitacao + ", setor="
                + setor + ", observacao=" + observacao + ", resposavel=" + responsavel + ", status=" + status + "]";
    }
    
}
