import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBolt,
  faBullseye,
  faBuilding,
  faCircleNodes,
  faCompassDrafting,
  faFileLines,
  faFlask,
  faGears,
  faGlobe,
  faGripLines,
  faHouse,
  faPlus,
  faScrewdriverWrench,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ModuleIconProps {
  moduleName: string;
  className?: string;
}

const ModuleIcon: React.FC<ModuleIconProps> = ({ moduleName, className = "h-6 w-6" }) => {
  const iconByModule: Record<string, IconDefinition> = {
    'Início': faHouse,
    'Metodologia': faBolt,
    'Definições': faPlus,
    'Tipologia': faGripLines,
    'Objetivos': faBullseye,
    'Princípios': faGlobe,
    'Sistema': faGears,
    'Laboratório': faFlask,
    'Prêmio': faTrophy,
    'Ferramentas': faScrewdriverWrench,
    'Governança': faBuilding,
    'Estratégias': faCompassDrafting,
    'Documentação': faFileLines,
  };

  return <FontAwesomeIcon icon={iconByModule[moduleName] ?? faCircleNodes} className={className} />;
};

export default ModuleIcon;
