const GerenciadorDeTarefas = require('../src/Trabalho01Turma01');

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('Adicionando tarefas e listando todas ', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia' };
        gerenciador.adicionarTarefa(tarefa);

        expect(gerenciador.listarTarefas()).toContain(tarefa);
    });

    test('Lançar um erro ao adicionar uma tarefa com descrição muito curta', () => {
        const tarefa = { id: 1, descricao: 'Lua' };

        expect(() => {
            gerenciador.adicionarTarefa(tarefa);
        }).toThrow('Erro ao cadastrar tarefa');
    });

    test('Remover tarefa por ID', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(1);

        expect(gerenciador.listarTarefas()).not.toContain(tarefa);
    });

    test('Buscar tarefa por ID', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia' };
        gerenciador.adicionarTarefa(tarefa);

        expect(gerenciador.buscarTarefaPorId(1)).toEqual(tarefa);
    });

    test('Atualizar tarefa por ID', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(1, { descricao: 'Ir no mercado' });

        expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Ir no mercado');
    });

    test('Listar todas as tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia' };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('Contando o número de tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia' };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('Marcar tarefa como concluída', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(1);

        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
    });

    test('Listando tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.listarTarefasConcluidas()).toEqual([tarefa1]);
    });

    test('Listando tarefas pendentes', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia' };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.listarTarefasPendentes()).toEqual([tarefa1]);
    });

    test('Remover tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();

        expect(gerenciador.listarTarefas()).toEqual([tarefa2]);
    });

    test('Buscar tarefas por descrição', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia' };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.buscarTarefaPorDescricao('academia')).toEqual([tarefa1]);
    });

    test('Adicionar uma tag a uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(1, 'diária');

        expect(gerenciador.buscarTarefaPorId(1).tags).toContain('diária');
    });

    test('Removendo uma tag de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia', tags: ['diária'] };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTagDaTarefa(1, 'diária');

        expect(gerenciador.buscarTarefaPorId(1).tags).not.toContain('diária');
    });

    test('Listar tarefas por tag', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia', tags: ['diária'] };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado', tags: ['mensal'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.listarTarefasPorTag('diária')).toEqual([tarefa1]);
    });

    test('Buscando tarefas por data', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia', data: '2024-09-05' };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado', data: '2024-09-06' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.buscarTarefasPorData('2024-09-05')).toEqual([tarefa1]);
    });

    test('Atualizar a prioridade de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(1, 2);

        expect(gerenciador.buscarTarefaPorId(1).prioridade).toBe(2);
    });

    test('Listando tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia', prioridade: 1 };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.listarTarefasPorPrioridade(1)).toEqual([tarefa1]);
    });

    test('Contando tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia', prioridade: 1 };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(2);
    });

    test('Marcar todas as tarefas como concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia' };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();

        expect(gerenciador.listarTarefas().every(t => t.concluida)).toBe(true);
    });

    test('Reabrir uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Ir para academia', concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.reabrirTarefa(1);

        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(false);
    });

    test('Ordenar tarefas por data', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia', data: '2024-09-06' };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado', data: '2024-09-05' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();

        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });

    test('Ordenar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Ir para academia', prioridade: 2 };
        const tarefa2 = { id: 2, descricao: 'Ir no mercado', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();

        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });
});
