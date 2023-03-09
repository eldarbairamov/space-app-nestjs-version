import { useState } from "react";

import { Select } from "antd";
import { NoBgButton } from "@src/component";
import { TypedSetState } from "@src/interface/common.interface";
import { useAppSelector } from "@src/hook";

import style from "./Moment-Header.module.scss";
import addLight from "@src/asset/add-light.svg";
import addDark from "@src/asset/add-dark.svg";

interface IMomentHeaderProps {
   addMomentFn: () => Promise<void>;
   setSearchKey: TypedSetState<string>;
}

export function MomentHeader({ addMomentFn, setSearchKey }: IMomentHeaderProps) {
   const select = (value: string) => setSearchKey(value);
   const [ isValueNull, setIsValueNull ] = useState<any>();

   const { tags } = useAppSelector(state => state.momentReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <div className={ style.MomentHeader }>
         {/* Save moment */ }
         <div className={ style.save_moment }>
            <img src={ isDark ? addLight : addDark } alt={ "add" }/>
            <NoBgButton text={ "Зберегти момент" } hoverSubject={ "moment" } onClick={ async () => {
               await addMomentFn();
               select("");
               setIsValueNull(null);
            } }/>
         </div>

         {/* Select */ }
         <div className={ style.select_wrapper }>
            <Select style={ { width: 130 } }
                    className={ style.select }
                    allowClear={ true }
                    placeholder="Фільтр"
                    notFoundContent={ "Пусто" }
                    bordered={ false }
                    value={ isValueNull && null }
                    onChange={ select }
                    options={ tags.map(tag => ({ value: tag, label: tag })) }
                    filterOption={ (input, option) =>
                       (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
            />
         </div>

      </div>
   );
}
