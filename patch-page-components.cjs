const fs = require('fs');
let page = fs.readFileSync('src/prototipos/PrototiposPage.tsx', 'utf8');

const components = `
export function PrototiposControleVagasVagasNumeradasPage() {
  const navigate = useNavigate();

  const handleEditar = (vaga: ControleVagasVagaNumeradaRow) => {
    navigate(\`/prototipos/sigep/controle-vagas/vagas-numeradas/\${vaga.id}/editar\`);
  };

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content prototype-page-content--white">
        <CardSeplag
          title="Vagas Numeradas"
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
        >
          <div className="prototype-controle-vagas-list">
            <div className="prototype-controle-vagas-list-header">
              <BotaoSeplag
                type="button"
                label="Adicionar Vaga Numerada"
                icon="pi pi-plus"
                onClick={() =>
                  navigate("/prototipos/sigep/controle-vagas/vagas-numeradas/novo")
                }
              />
            </div>

            <div className="prototype-table-wrapper">
              <table className="prototype-simple-table">
                <thead>
                  <tr>
                    <th>Código da Vaga</th>
                    <th>Cargo/Função</th>
                    <th>Órgão/Setor</th>
                    <th>Ocupante Atual</th>
                    <th>Situação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {controleVagasVagasNumeradasMock.map((vaga) => (
                    <tr key={vaga.id}>
                      <td>
                        <strong>{vaga.codigo}</strong>
                      </td>
                      <td>{vaga.cargoFuncao}</td>
                      <td>{vaga.orgaoSetor}</td>
                      <td>{vaga.ocupanteAtual}</td>
                      <td>
                        <span className={\`prototype-badge prototype-badge--\${vaga.situacao.toLowerCase()}\`}>
                          {vaga.situacao}
                        </span>
                      </td>
                      <td>
                        <div className="prototype-controle-vagas-row-actions">
                          <BotaoIconSeplag
                            type="button"
                            icon="pi pi-eye"
                            onClick={() => handleEditar(vaga)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="prototype-form-actions">
              <BotaoVoltarSeplag
                type="button"
                label="Voltar"
                icon="pi pi-arrow-left"
                onClick={() => navigate("/prototipos/sigep/controle-vagas")}
              />
            </div>
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposControleVagasVagasNumeradasFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const vaga = controleVagasVagasNumeradasMock.find(
    (item) => String(item.id) === id,
  );
  const isEditing = Boolean(id);
  const [activeTab, setActiveTab] = useState("detalhes");

  const { control } = useForm<ControleVagasVagaNumeradaForm>({
    defaultValues: {
      codigo: vaga?.codigo ?? "",
      cargoFuncao: vaga?.cargoFuncao ?? "",
      orgaoSetor: vaga?.orgaoSetor ?? "",
      situacao: vaga?.situacao ?? "Disponível",
      observacao: "",
    },
  });

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content prototype-page-content--white">
        <CardSeplag
          title={\`\${isEditing ? "Visualizar/Alterar" : "Cadastrar"} - Vaga Numerada\`}
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
        >
          <div className="prototype-controle-vagas-form">
            <TabsSeplag
              items={controleVagasVagaNumeradaTabs}
              activeValue={activeTab}
              onChange={setActiveTab}
              equalWidth
            />

            {activeTab === "detalhes" && (
              <div className="grid prototype-controle-vagas-form-section">
                <TextFieldSeplag
                  name="codigo"
                  control={control}
                  label="Código da Vaga"
                  cols="12 12 4"
                  placeholder="Ex.: VA-001"
                  required
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="cargoFuncao"
                  control={control}
                  label="Cargo/Função"
                  cols="12 12 4"
                  options={controleVagasCargoFuncaoOptions}
                  optionLabel="label"
                  optionValue="value"
                  required
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="orgaoSetor"
                  control={control}
                  label="Órgão/Setor"
                  cols="12 12 4"
                  options={controleVagasOrgaoSetorOptions}
                  optionLabel="label"
                  optionValue="value"
                  required
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="situacao"
                  control={control}
                  label="Situação"
                  cols="12 12 4"
                  options={controleVagasVagaNumeradaSituacaoOptions}
                  optionLabel="label"
                  optionValue="value"
                  required
                  getFormErrorMessage={() => null}
                />
                <TextAreaFieldSeplag
                  name="observacao"
                  control={control}
                  label="Observação"
                  cols="12"
                  rows={3}
                  getFormErrorMessage={() => null}
                />
              </div>
            )}

            {activeTab === "ocupacao-atual" && (
              <div className="prototype-controle-vagas-historico">
                <div className="prototype-controle-vagas-section-title">
                  <h3>Ocupação Atual</h3>
                  <p>Dados do servidor que está ocupando esta vaga atualmente.</p>
                </div>
                {vaga?.situacao === "Ocupada" ? (
                  <div className="grid prototype-controle-vagas-form-section">
                    <div className="col-12 md:col-6 lg:col-4">
                      <strong>Servidor:</strong> {vaga.ocupanteAtual}
                    </div>
                    <div className="col-12 md:col-6 lg:col-4">
                      <strong>Matrícula:</strong> 123456
                    </div>
                    <div className="col-12 md:col-6 lg:col-4">
                      <strong>Data de Ingresso:</strong> 01/01/2020
                    </div>
                  </div>
                ) : (
                  <div className="prototype-empty-state">
                    <p>A vaga não está ocupada no momento.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "historico" && (
              <div className="prototype-controle-vagas-historico">
                <div className="prototype-controle-vagas-section-title">
                  <h3>Histórico da Vaga</h3>
                  <p>Registro somente leitura das alterações simuladas para esta vaga.</p>
                </div>
                <div className="prototype-table-wrapper">
                  <table className="prototype-simple-table">
                    <thead>
                      <tr>
                        <th>Data/Hora</th>
                        <th>Evento</th>
                        <th>Usuário</th>
                        <th>Detalhe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {controleVagasHistoricoMock.filter(h => h.vagaNumero === vaga?.codigo).map((item) => (
                        <tr key={item.id}>
                          <td>{item.dataHora}</td>
                          <td>{item.evento}</td>
                          <td>{item.usuario}</td>
                          <td>{item.detalhe}</td>
                        </tr>
                      ))}
                      {controleVagasHistoricoMock.filter(h => h.vagaNumero === vaga?.codigo).length === 0 && (
                        <tr>
                          <td colSpan={4} className="prototype-empty-table-cell">Nenhum histórico encontrado.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="prototype-form-actions">
              <BotaoVoltarSeplag
                type="button"
                label="Voltar"
                icon="pi pi-arrow-left"
                onClick={() =>
                  navigate("/prototipos/sigep/controle-vagas/vagas-numeradas")
                }
              />
              <BotaoSalvarSeplag type="button" label="Salvar" />
            </div>
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}
`;

page += components;
fs.writeFileSync('src/prototipos/PrototiposPage.tsx', page);
