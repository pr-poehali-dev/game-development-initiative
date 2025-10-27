import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Choice {
  text: string;
  affectionChange: number;
}

interface DialogueNode {
  id: number;
  character: string;
  text: string;
  image: string;
  choices?: Choice[];
}

const Index = () => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [affection, setAffection] = useState(30);
  const [suspicion, setSuspicion] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  const dialogues: DialogueNode[] = [
    {
      id: 0,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b7690366-d974-436e-a70e-2b7bb0bc4e0d.jpg',
      text: 'Ваше величество... Вы снова работаете всю ночь. Прошу вас, отдохните. Я так беспокоюсь о вашем здоровье.',
      choices: [
        { text: 'Ты прав, Аффогато. Я устал.', affectionChange: 20 },
        { text: 'Королевство важнее моего отдыха.', affectionChange: 5 },
        { text: 'Не вмешивайся в мои дела.', affectionChange: -15 }
      ]
    },
    {
      id: 1,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/62837394-eecf-4659-8110-84cb6b9f4476.jpg',
      text: '*вздыхает* Метель усиливается. Границы нуждаются в укреплении, а я здесь...',
      choices: [
        { text: 'Позволить Аффогато помочь', affectionChange: 15 },
        { text: 'Справлюсь сам', affectionChange: -5 }
      ]
    },
    {
      id: 2,
      character: 'Генерал',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/9e1c5a2e-8e15-4998-9bd2-70b515dfa2de.jpg',
      text: 'Ваше величество! У меня есть план по укреплению обороны. Если позволите, я хотел бы обсудить его с вами наедине.',
      choices: [
        { text: 'Давай обсудим это сейчас.', affectionChange: -15 },
        { text: 'Аффогато тоже должен это услышать.', affectionChange: 10 },
        { text: 'Приходи позже, генерал.', affectionChange: 5 }
      ]
    },
    {
      id: 3,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b7690366-d974-436e-a70e-2b7bb0bc4e0d.jpg',
      text: '*появляется из тени* Я слышал разговор с генералом. *холодная улыбка* Не доверяйте ему, ваше величество. Некоторые из военных совета... не так преданны, как кажется.',
      choices: [
        { text: 'Ты всегда защищаешь меня...', affectionChange: 20 },
        { text: 'А ты откуда знаешь об этом?', affectionChange: -20 },
        { text: 'Генерал служит верой и правдой.', affectionChange: -15 }
      ]
    },
    {
      id: 4,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/62837394-eecf-4659-8110-84cb6b9f4476.jpg',
      text: '*устало снимает доспехи после долгого дня* Мне нужно принять ванну... Слуги могут уйти, я справлюсь сам.',
      choices: [
        { text: 'Пойти в ванную комнату', affectionChange: 0 }
      ]
    },
    {
      id: 5,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b7690366-d974-436e-a70e-2b7bb0bc4e0d.jpg',
      text: '*мягко входит в ванную* Ваше величество, позвольте мне помочь вам. *улыбается* Вы так устали, что даже руки дрожат. Я уже приготовил воду с травами для расслабления.',
      choices: [
        { text: 'Аффогато, я не просил тебя...', affectionChange: -10 },
        { text: 'Хорошо, спасибо за заботу.', affectionChange: 20 },
        { text: '*промолчать*', affectionChange: 10 }
      ]
    },
    {
      id: 6,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b7690366-d974-436e-a70e-2b7bb0bc4e0d.jpg',
      text: '*осторожно моет спину короля* Ваше величество... я заметил, что служанка сегодня смотрела на вас. *голос становится холоднее* Я уже позаботился о том, чтобы её перевели в дальнее крыло замка.',
      choices: [
        { text: 'Зачем ты это сделал?', affectionChange: -20 },
        { text: 'Ты слишком много берёшь на себя.', affectionChange: -15 },
        { text: '*не сказать ничего*', affectionChange: 15 }
      ]
    },
    {
      id: 7,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/62837394-eecf-4659-8110-84cb6b9f4476.jpg',
      text: '*напряжённо* Аффогато... Это была просто служанка, выполняющая свои обязанности. Почему ты так реагируешь на каждого, кто приближается ко мне?',
      choices: [
        { text: 'Потребовать объяснений', affectionChange: -25 },
        { text: 'Оставить этот разговор', affectionChange: 5 }
      ]
    },
    {
      id: 8,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b7690366-d974-436e-a70e-2b7bb0bc4e0d.jpg',
      text: '*его руки замирают, голос дрожит* Потому что... они не достойны даже смотреть на вас. *шёпот* Только я. С того дня, как впервые увидел вас... я понял, что должен защищать вас от всех. От каждого взгляда, от каждого прикосновения... которое не моё.',
      choices: [
        { text: 'Аффогато, это нездорово...', affectionChange: -30 },
        { text: '*почувствовать страх*', affectionChange: -25 },
        { text: 'Я понимаю твою преданность.', affectionChange: 25 }
      ]
    },
    {
      id: 9,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/62837394-eecf-4659-8110-84cb6b9f4476.jpg',
      text: '*смотрит в окно на метель* Аффогато, как долго ты уже служишь мне? Иногда мне кажется, что ты знаешь обо мне больше, чем я сам...',
      choices: [
        { text: 'Это успокаивает.', affectionChange: 15 },
        { text: 'Это... тревожит.', affectionChange: -25 }
      ]
    },
    {
      id: 10,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b7690366-d974-436e-a70e-2b7bb0bc4e0d.jpg',
      text: '*приближается* С того самого дня, когда я впервые увидел вас на троне... Вы были таким величественным, таким недостижимым. *шёпот* Я поклялся себе, что буду рядом. Всегда. Только я достоин быть рядом с вами.',
      choices: [
        { text: 'Я благодарен за твою преданность.', affectionChange: 25 },
        { text: '*отступить назад*', affectionChange: -30 }
      ]
    },
    {
      id: 11,
      character: 'Генерал',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/9e1c5a2e-8e15-4998-9bd2-70b515dfa2de.jpg',
      text: '*тихо* Ваше величество, я должен вам сказать... Советник Аффогато недавно отдавал приказы от вашего имени. Солдаты на границе в замешательстве. Простите мою дерзость, но это опасно.',
      choices: [
        { text: 'Я разберусь с этим.', affectionChange: -20 },
        { text: 'Аффогато действовал в моих интересах.', affectionChange: 15 },
        { text: 'Почему ты молчал раньше?', affectionChange: -10 }
      ]
    },
    {
      id: 12,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b7690366-d974-436e-a70e-2b7bb0bc4e0d.jpg',
      text: '*его глаза горят холодным огнём* Ваше величество... Вы ведь понимаете, что я делаю всё это только для вас? *голос дрожит* Никто не должен стоять между нами. Никто.',
      choices: [
        { text: 'Ты единственный, кому я могу доверять.', affectionChange: 30 },
        { text: 'Аффогато, ты переходишь границы.', affectionChange: -35 }
      ]
    }
  ];

  const dialogue = dialogues[currentDialogue];

  useEffect(() => {
    setDisplayedText('');
    setIsTextComplete(false);
    setShowChoices(false);
    
    let index = 0;
    const text = dialogue.text;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTextComplete(true);
        setShowChoices(true);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentDialogue, dialogue.text]);

  const handleChoice = (choice: Choice) => {
    const newAffection = Math.max(0, Math.min(100, affection + choice.affectionChange));
    setAffection(newAffection);
    
    if (choice.affectionChange < 0) {
      setSuspicion(Math.min(100, suspicion + Math.abs(choice.affectionChange)));
    }
    
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
    }
  };

  const getAffectionColor = () => {
    if (affection >= 70) return 'bg-purple-600';
    if (affection >= 40) return 'bg-blue-500';
    return 'bg-slate-600';
  };

  const getAffectionLabel = () => {
    if (affection >= 80) return 'Абсолютная преданность';
    if (affection >= 60) return 'Глубокая привязанность';
    if (affection >= 40) return 'Доверие';
    if (affection >= 20) return 'Уважение';
    return 'Холодная вежливость';
  };

  const getSuspicionLabel = () => {
    if (suspicion >= 60) return 'Что-то не так...';
    if (suspicion >= 30) return 'Лёгкие сомнения';
    return 'Никаких подозрений';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-slate-900 to-slate-950 font-montserrat relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-cormorant font-semibold text-foreground mb-2">
            Королевство Тёмного Какао
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Icon name="Snowflake" size={16} />
            Визуальная новелла
            <Icon name="Snowflake" size={16} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-5 bg-card/80 backdrop-blur-sm border-purple-500/30 animate-scale-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Heart" className="text-purple-400" size={20} />
                <span className="font-medium text-sm">{getAffectionLabel()}</span>
              </div>
              <span className="text-sm text-muted-foreground">{affection}%</span>
            </div>
            <Progress value={affection} className="h-2.5">
              <div className={`h-full ${getAffectionColor()} transition-all duration-500`} style={{ width: `${affection}%` }} />
            </Progress>
          </Card>
          
          <Card className="p-5 bg-card/80 backdrop-blur-sm border-blue-500/30 animate-scale-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Eye" className="text-blue-400" size={20} />
                <span className="font-medium text-sm">{getSuspicionLabel()}</span>
              </div>
              <span className="text-sm text-muted-foreground">{suspicion}%</span>
            </div>
            <Progress value={suspicion} className="h-2.5">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${suspicion}%` }} />
            </Progress>
          </Card>
        </div>

        <Card className="mb-6 bg-card/90 backdrop-blur-md border-slate-700/50 animate-scale-in shadow-2xl">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img 
              src={dialogue.image}
              alt={dialogue.character}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-cormorant font-semibold text-purple-300 mb-1">
                {dialogue.character}
              </h3>
            </div>
          </div>

          <div className="p-6">
            <div className="min-h-[120px] mb-6">
              <p className="text-lg font-cormorant leading-relaxed animate-text-reveal">
                {displayedText}
                {!isTextComplete && <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse"></span>}
              </p>
            </div>

            {showChoices && dialogue.choices && (
              <div className="space-y-3">
                {dialogue.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 px-5 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300 group"
                  >
                    <Icon name="MessageCircle" className="mr-3 text-purple-400 group-hover:scale-110 transition-transform" size={18} />
                    <span className="font-cormorant text-base">{choice.text}</span>
                  </Button>
                ))}
              </div>
            )}

            {!dialogue.choices && isTextComplete && (
              <div className="text-center">
                <div className="mb-6 p-6 bg-slate-800/50 rounded-lg">
                  <p className="text-2xl font-cormorant text-purple-300 mb-3">
                    {affection >= 70 && suspicion < 40 ? '❄️ Финал: Вечная преданность' : 
                     affection >= 70 && suspicion >= 40 ? '⚠️ Финал: Опасная близость' :
                     affection >= 40 ? '💭 Финал: Тревожная неопределённость' : 
                     '🖤 Финал: Холодное отдаление'}
                  </p>
                  <p className="text-sm text-muted-foreground font-cormorant">
                    {affection >= 70 && suspicion < 40 ? 'Аффогато навсегда остался рядом с королём. Его чувства были приняты...' :
                     affection >= 70 && suspicion >= 40 ? 'Король чувствует странность в поведении советника, но уже слишком поздно...' :
                     affection >= 40 ? 'Дарк Какао продолжает работать, не замечая истинных намерений своего советника.' :
                     'Король отдалился от Аффогато, почувствовав опасность.'}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setCurrentDialogue(0);
                    setAffection(30);
                    setSuspicion(0);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Icon name="RotateCcw" className="mr-2" size={18} />
                  Начать заново
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Info" size={16} />
            Твои выборы влияют на развитие истории и отношения между персонажами
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;