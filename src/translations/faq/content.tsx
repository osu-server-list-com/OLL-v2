export const translations = {
  en: {
    title: "FAQ & Help",
    sections: [
      {
        title: "Getting Started",
        content: (
          <div className="space-y-2">
            <p>To start using OSL (OsuServerLauncher), follow these steps:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Select your osu!.exe file using the button in the bottom panel</li>
              <li>Browse the available servers in the main window</li>
              <li>Click "Select" on your chosen server</li>
              <li>Click "Launch" to start playing</li>
            </ol>
          </div>
        )
      },
      {
        title: "Features",
        content: (
          <div className="space-y-2">
            <h4 className="font-semibold">Server List</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Real-time player count</li>
              <li>Server voting system</li>
              <li>Quick server switching</li>
              <li>Favorites system</li>
            </ul>

            <h4 className="font-semibold mt-4">Statistics</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Playtime tracking for each server</li>
              <li>Session tracking</li>
              <li>History of last 5 played servers</li>
            </ul>

            <h4 className="font-semibold mt-4">Customization</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Dark/Light theme</li>
              <li>Sorting preferences</li>
              <li>Auto-close option</li>
            </ul>
          </div>
        )
      },
      {
        title: "Troubleshooting",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Game Won't Launch</h4>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Verify that the selected osu!.exe path is correct</li>
                <li>Try selecting the osu!.exe file again</li>
                <li>Make sure you have selected a server</li>
                <li>Check if osu! is already running</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold">Server Connection Issues</h4>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Check your internet connection</li>
                <li>Verify the server is online (green dot indicator)</li>
                <li>Try refreshing the server list</li>
                <li>Make sure your firewall isn't blocking the connection</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold">Common Solutions</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Restart the launcher</li>
                <li>Clear browser cache</li>
                <li>Update osu! to the latest version</li>
                <li>Check the server's Discord for known issues</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: "How It Works",
        content: (
          <div className="space-y-2">
            <p>OSL simplifies the process of connecting to different osu! private servers:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>The launcher fetches server information from osu-server-list.com</li>
              <li>When you select a server, it prepares the connection parameters</li>
              <li>Launching adds the server's connection details to osu!'s startup</li>
              <li>The launcher tracks your playtime and session information locally</li>
            </ol>
            <p className="mt-4 text-sm text-secondary">
              Note: All statistics and preferences are stored locally on your computer.
            </p>
          </div>
        )
      },
      {
        title: "Tips & Tricks",
        content: (
          <div className="space-y-2">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the favorites system to quickly access your preferred servers</li>
              <li>Sort servers by player count to find active communities</li>
              <li>Check the playtime statistics to track your server preferences</li>
              <li>Enable auto-close if you want the launcher to close after game launch</li>
              <li>Use the theme toggle to match your osu! client theme</li>
              <li>Create a desktop shortcut for quick access</li>
            </ul>
          </div>
        )
      },
      {
        title: "Contact & Support",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Need Help?</h4>
              <p>Join our Discord community for support and updates:</p>
              <button 
                onClick={() => window.electron.openExternal('https://discord.gg/AyEFRYHjb4')}
                className="mt-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded transition-colors duration-200"
              >
                Join Discord Server
              </button>
            </div>

            <div>
              <h4 className="font-semibold">Developer Contact</h4>
              <p>Created by KyurenoXD</p>
              <p className="text-sm text-secondary">For business inquiries or bug reports, please use Discord.</p>
            </div>
          </div>
        )
      }
    ]
  },
  ru: {
    title: "FAQ и Помощь",
    sections: [
      {
        title: "Начало работы",
        content: (
          <div className="space-y-2">
            <p>Чтобы начать использовать OSL (OsuServerLauncher), выполните следующие шаги:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Выберите файл osu!.exe с помощью кнопки в нижней панели</li>
              <li>Просмотрите доступные серверы в главном окне</li>
              <li>Нажмите "Select" на выбранном сервере</li>
              <li>Нажмите "Launch" для начала игры</li>
            </ol>
          </div>
        )
      },
      {
        title: "Функции",
        content: (
          <div className="space-y-2">
            <h4 className="font-semibold">Список серверов</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Количество игроков в реальном времени</li>
              <li>Система голосования за серверы</li>
              <li>Быстрое переключение между серверами</li>
              <li>Система избранных серверов</li>
            </ul>

            <h4 className="font-semibold mt-4">Статистика</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Отслеживание времени игры на каждом сервере</li>
              <li>Отслеживание сессий</li>
              <li>История последних 5 серверов</li>
            </ul>

            <h4 className="font-semibold mt-4">Настройка</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Темная/Светлая тема</li>
              <li>Настройки сортировки</li>
              <li>Автоматическое закрытие</li>
            </ul>
          </div>
        )
      },
      {
        title: "Устранение проблем",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Игра не запускается</h4>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Проверьте правильность пути к osu!.exe</li>
                <li>Попробуйте выбрать файл osu!.exe заново</li>
                <li>Убедитесь, что выбран сервер</li>
                <li>Проверьте, не запущена ли уже osu!</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold">Проблемы с подключением</h4>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Проверьте подключение к интернету</li>
                <li>Убедитесь, что сервер онлайн (зеленый индикатор)</li>
                <li>Попробуйте обновить список серверов</li>
                <li>Проверьте, не блокирует ли брандмауэр подключение</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold">Общие решения</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Перезапустите лаунчер</li>
                <li>Очистите кэш браузера</li>
                <li>Обновите osu! до последней версии</li>
                <li>Проверьте Discord сервера на наличие известных проблем</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: "Как это работает",
        content: (
          <div className="space-y-2">
            <p>OSL упрощает процесс подключения к разным приватным серверам osu!:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Лаунчер получает информацию о серверах с osu-server-list.com</li>
              <li>При выборе сервера подготавливаются параметры подключения</li>
              <li>При запуске добавляются данные сервера в параметры запуска osu!</li>
              <li>Лаунчер отслеживает время игры и информацию о сессиях локально</li>
            </ol>
            <p className="mt-4 text-sm text-secondary">
              Примечание: Вся статистика и настройки хранятся локально на вашем компьютере.
            </p>
          </div>
        )
      },
      {
        title: "Советы и приемы",
        content: (
          <div className="space-y-2">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Используйте систему избранного для быстрого доступа к предпочитаемым серверам</li>
              <li>Сортируйте серверы по количеству игроков для поиска активных сообществ</li>
              <li>Проверяйте статистику времени игры для отслеживания предпочтений</li>
              <li>Включите автозакрытие, если хотите, чтобы лаунчер закрывался после запуска игры</li>
              <li>Используйте переключатель темы для соответствия теме клиента osu!</li>
              <li>Создайте ярлык на рабочем столе для б��строго доступа</li>
            </ul>
          </div>
        )
      },
      {
        title: "Контакты и поддержка",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Нужна помощь?</h4>
              <p>Присоединяйтесь к нашему Discord сообществу для поддержки и обновлений:</p>
              <button 
                onClick={() => window.electron.openExternal('https://discord.gg/AyEFRYHjb4')}
                className="mt-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded transition-colors duration-200"
              >
                Присоединиться к Discord
              </button>
            </div>

            <div>
              <h4 className="font-semibold">Контакт разработчика</h4>
              <p>Создано KyurenoXD</p>
              <p className="text-sm text-secondary">Для деловых запросов или сообщений об ошибках используйте Discord.</p>
            </div>
          </div>
        )
      }
    ]
  },
  ja: {
    title: "FAQ とヘルプ",
    sections: [
      {
        title: "はじめに",
        content: (
          <div className="space-y-2">
            <p>OSL (OsuServerLauncher) の使用を開始するには、次の手順に従ってください：</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>下部パネルのボタンを使用して osu!.exe ファイルを選択</li>
              <li>メインウィンドウで利用可能なサーバーを閲覧</li>
              <li>選択したサーバーで "Select" をクリック</li>
              <li>"Launch" をクリックしてプレイを開始</li>
            </ol>
          </div>
        )
      },
      {
        title: "機能",
        content: (
          <div className="space-y-2">
            <h4 className="font-semibold">サーバーリスト</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>リアルタイムプレイヤー数</li>
              <li>サーバー投票システム</li>
              <li>クイックサーバー切り替え</li>
              <li>お気に入りシステム</li>
            </ul>

            <h4 className="font-semibold mt-4">Statistics</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>各サーバーのプレイ時間を追跡</li>
              <li>セッションの追跡</li>
              <li>最後にプレイした5つのサーバーの履歴</li>
            </ul>

            <h4 className="font-semibold mt-4">カスタマイズ</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>ダーク/ライトテーマ</li>
              <li>ソート設定</li>
              <li>自動終了オプション</li>
            </ul>
          </div>
        )
      },
      {
        title: "トラブルシューティング",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">ゲームが起動しない</h4>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>選択した osu!.exe パスが正しいか確認</li>
                <li>osu!.exe ファイルを再選択してみてください</li>
                <li>サーバーが選択されていることを確認</li>
                <li>osu! が既に実行中ではないか確認</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold">サーバー接続の問題</h4>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>インターネット接続を確認</li>
                <li>サーバーがオンラインであることを確認（緑色のドットインジケーター）</li>
                <li>サーバーリストを更新してみてください</li>
                <li>ファイアウォールが接続をブロックしていないか確認</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold">一般的な解決策</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>ランチャーを再起動</li>
                <li>ブラウザのキャッシュをクリア</li>
                <li>osu! を最新バージョンに更新</li>
                <li>サーバーの Discord で既知の問題を確認</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: "動作方法",
        content: (
          <div className="space-y-2">
            <p>OSL は異なる osu! プライベートサーバーに接続するプロセスを簡素化します：</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>ランチャーは osu-server-list.com からサーバー情報を取得します</li>
              <li>サーバーを選択すると、接続パラメータを準備します</li>
              <li>起動時にサーバーの接続詳細を osu! の起動パラメータに追加します</li>
              <li>ランチャーはローカルにプレイ時間とセッション情報を追跡します</li>
            </ol>
            <p className="mt-4 text-sm text-secondary">
              注意：すべての統計情報と設定はローカルに保存されます。
            </p>
          </div>
        )
      },
      {
        title: "ヒントとテクニック",
        content: (
          <div className="space-y-2">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>お気に入りシステムを使用して、好みのサーバーに迅速にアクセス</li>
              <li>プレイヤー数でサーバーを並べ替えて、アクティブなコミュニティを見つける</li>
              <li>プレイ時間の統計を確認して、好みのサーバーを追跡</li>
              <li>ゲーム起動後に自動終了を有効にすると、ランチャーがゲーム起動後に自動的に終了するようになります</li>
              <li>テーマトグルを使用して、osu! クライアントのテーマに一致させる</li>
              <li>クイックアクセス用のデスクトップショートカットを作成</li>
            </ul>
          </div>
        )
      },
      {
        title: "コンタクトとサポート",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">ヘルプが必要ですか？</h4>
              <p>サポートとアップデートのために Discord コミュニティに参加してください：</p>
              <button 
                onClick={() => window.electron.openExternal('https://discord.gg/AyEFRYHjb4')}
                className="mt-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded transition-colors duration-200"
              >
                Discord サーバーに参加
              </button>
            </div>

            <div>
              <h4 className="font-semibold">開発者への連絡先</h4>
              <p>KyurenoXD によって作成</p>
              <p className="text-sm text-secondary">ビジネスのお問い合わせやバグレポートには Discord を使用してください。</p>
            </div>
          </div>
        )
      }
    ]
  },
  pt: {
    title: "FAQ e Ajuda",
    sections: [
      {
        title: "Começando",
        content: (
          <div className="space-y-2">
            <p>Para começar a usar o OSL (OsuServerLauncher), siga estes passos:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Selecione seu arquivo osu!.exe usando o botão no painel inferior</li>
              <li>Navegue pelos servidores disponíveis na janela principal</li>
              <li>Clique em "Select" no servidor escolhido</li>
              <li>Clique em "Launch" para começar a jogar</li>
            </ol>
          </div>
        )
      },
      {
        title: "Recursos",
        content: (
          <div className="space-y-2">
            <h4 className="font-semibold">Lista de Servidores</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Contagem de jogadores em tempo real</li>
              <li>Sistema de votação de servidores</li>
              <li>Troca rápida de servidores</li>
              <li>Sistema de favoritos</li>
            </ul>

            <h4 className="font-semibold mt-4">Statistics</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Rastreamento de tempo de jogo para cada servidor</li>
              <li>Rastreamento de sessão</li>
              <li>Histórico dos últimos 5 servidores jogados</li>
            </ul>

            <h4 className="font-semibold mt-4">Customization</h4>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Tema Escuro/Claro</li>
              <li>Preferências de classificação</li>
              <li>Opção de fechamento automático</li>
            </ul>
          </div>
        )
      },
      {
        title: "Solução de Problemas",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">O Jogo Não Inicia</h4>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Verifique se o caminho do osu!.exe está correto</li>
                <li>Tente selecionar o arquivo osu!.exe novamente</li>
                <li>Certifique-se de ter selecionado um servidor</li>
                <li>Verifique se o osu! já está em execução</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold">Problemas de Conexão</h4>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Verifique sua conexão com a internet</li>
                <li>Verifique se o servidor está online (indicador verde)</li>
                <li>Tente atualizar a lista de servidores</li>
                <li>Verifique se seu firewall não está bloqueando</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold">Soluções Comuns</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Reinicie o launcher</li>
                <li>Limpe o cache do navegador</li>
                <li>Atualize o osu! para a última versão</li>
                <li>Verifique o Discord do servidor para problemas conhecidos</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: "Como Funciona",
        content: (
          <div className="space-y-2">
            <p>O OSL simplifica o processo de conexão com diferentes servidores privados do osu!:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>O launcher obtém informações do servidor de osu-server-list.com</li>
              <li>Quando você seleciona um servidor, ele prepara os parâmetros de conexão</li>
              <li>O lançamento adiciona os detalhes de conexão do servidor à inicialização do osu!</li>
              <li>O launcher rastreia seu tempo de jogo e informações de sessão localmente</li>
            </ol>
            <p className="mt-4 text-sm text-secondary">
              Nota: Todas as estatísticas e preferências são armazenadas localmente no seu computador.
            </p>
          </div>
        )
      },
      {
        title: "Dicas e Truques",
        content: (
          <div className="space-y-2">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use o sistema de favoritos para acessar rapidamente seus servidores preferidos</li>
              <li>Classifique os servidores por contagem de jogadores para encontrar comunidades ativas</li>
              <li>Verifique as estatísticas de tempo de jogo para acompanhar suas preferências</li>
              <li>Ative o fechamento automático se quiser que o launcher feche após iniciar o jogo</li>
              <li>Use a alternância de tema para corresponder ao tema do seu cliente osu!</li>
              <li>Crie um atalho na área de trabalho para acesso rápido</li>
            </ul>
          </div>
        )
      },
      {
        title: "Contato e Suporte",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Precisa de Ajuda?</h4>
              <p>Junte-se à nossa comunidade Discord para suporte e atualizações:</p>
              <button 
                onClick={() => window.electron.openExternal('https://discord.gg/AyEFRYHjb4')}
                className="mt-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded transition-colors duration-200"
              >
                Entrar no Discord
              </button>
            </div>

            <div>
              <h4 className="font-semibold">Contato do Desenvolvedor</h4>
              <p>Criado por KyurenoXD</p>
              <p className="text-sm text-secondary">Para consultas comerciais ou relatórios de bugs, use o Discord.</p>
            </div>
          </div>
        )
      }
    ]
  }
}; 