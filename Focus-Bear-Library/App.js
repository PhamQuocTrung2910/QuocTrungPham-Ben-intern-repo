import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import i18n, { saveLanguage, loadLanguage } from './i18n';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const setInitialLanguage = async () => {
      const savedLang = await loadLanguage();
      i18n.changeLanguage(savedLang);
      setLanguage(savedLang);
    };
    setInitialLanguage();
  }, []);

  const switchLanguage = async () => {
    const newLang = language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    await saveLanguage(newLang);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>{t('welcome')}</Text>
      <Button title={t('change_language')} onPress={switchLanguage} />
    </View>
  );
}
