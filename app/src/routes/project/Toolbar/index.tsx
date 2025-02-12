import { HotKeysLabel } from '@/components/ui/hotkeys-label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EditorMode } from '@/lib/models';
import { CursorArrowIcon, HandIcon, SquareIcon, TextIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useEditorEngine } from '..';
import { Hotkeys } from '/common/hotkeys';

const TOOLBAR_ITEMS: {
    mode: EditorMode;
    icon: React.FC;
    hotkey: Hotkeys;
    disabled: boolean;
}[] = [
    {
        mode: EditorMode.DESIGN,
        icon: CursorArrowIcon,
        hotkey: Hotkeys.SELECT,
        disabled: false,
    },
    {
        mode: EditorMode.PAN,
        icon: HandIcon,
        hotkey: Hotkeys.PAN,
        disabled: false,
    },
    {
        mode: EditorMode.INSERT_DIV,
        icon: SquareIcon,
        hotkey: Hotkeys.INSERT_DIV,
        disabled: false,
    },
    {
        mode: EditorMode.INSERT_TEXT,
        icon: TextIcon,
        hotkey: Hotkeys.INSERT_TEXT,
        disabled: true,
    },
];

const Toolbar = observer(() => {
    const editorEngine = useEditorEngine();
    const [mode, setMode] = useState<EditorMode>(editorEngine.mode);

    useEffect(() => {
        setMode(editorEngine.mode);
    }, [editorEngine.mode]);

    return (
        <div
            className={clsx(
                'border p-1 flex bg-black/80 backdrop-blur rounded-lg drop-shadow-xl items-center justify-center',
                editorEngine.mode === EditorMode.INTERACT ? 'hidden' : 'visible',
            )}
        >
            <ToggleGroup
                type="single"
                value={mode}
                onValueChange={(value) => {
                    if (value) {
                        editorEngine.mode = value as EditorMode;
                        setMode(value as EditorMode);
                    }
                }}
            >
                {TOOLBAR_ITEMS.map((item) => (
                    <Tooltip key={item.mode}>
                        <TooltipTrigger>
                            <ToggleGroupItem
                                value={item.mode}
                                aria-label={item.hotkey.description}
                                disabled={item.disabled}
                            >
                                <item.icon />
                            </ToggleGroupItem>
                        </TooltipTrigger>
                        <TooltipContent>
                            <HotKeysLabel hotkey={item.hotkey} />
                        </TooltipContent>
                    </Tooltip>
                ))}
            </ToggleGroup>
        </div>
    );
});

export default Toolbar;
