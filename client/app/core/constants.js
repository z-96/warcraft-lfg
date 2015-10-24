/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
	    .constant("LANGUAGES",["en","de","fr","es","ru","bg","zh","hr","cs","da","nl","et","fi","el","he","hu","it","ja","ko","lv","lt","no","pl","pt","ro","sl","sv","tw","tr"])
	    .constant("GUILD_AD",{"recruitment":{"tanks":{"protection_warrior":false,"guardian_druid":false,"protection_paladin":false,"brewmaster_monk":false,"blood_deathknight":false},"heals":{"restoration_druid":false,"discipline_priest":false,"holy_priest":false,"holy_paladin":false,"restoration_chaman":false,"mistweaver_monk":false},"melee_dps":{"feral_druid":false,"deathknight":false,"retribution_paladin":false,"windwalker_monk":false,"enhancement_shaman":false,"warrior":false,"rogue":false},"distant_dps":{"shadow_priest":false,"elemental_shaman":false,"hunter":false,"warlock":false,"mage":false}},"raids_per_week":{"1_per_week":false,"2_per_week":false,"3_per_week":false,"4_per_week":false,"5_per_week":false,"6_per_week":false,"7_per_week":false},"raiding_style":"semi-hardcore"})
	    .constant("CHARACTER_AD", {"role":{"tank": false, "dps": false, "healer": false},"raids_per_week":{"1_per_week":false,"2_per_week":false,"3_per_week":false,"4_per_week":false,"5_per_week":false,"6_per_week":false,"7_per_week":false}})
	;

})();