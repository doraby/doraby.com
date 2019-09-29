<?php
/* Smarty version 3.1.31, created on 2018-11-04 22:28:53
  from "/home/user1151942/www/dorogenskaya.com/manager/templates/default/resource/weblink/create.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5bdf487582e7f7_93536524',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9223967714e62205c2e6fae4994e0cb457c1572d' => 
    array (
      0 => '/home/user1151942/www/dorogenskaya.com/manager/templates/default/resource/weblink/create.tpl',
      1 => 1531325208,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5bdf487582e7f7_93536524 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div id="modx-panel-weblink-div"></div>
<div id="modx-resource-tvs-div" class="modx-resource-tab x-form-label-left x-panel"><?php echo (($tmp = @$_smarty_tpl->tpl_vars['tvOutput']->value)===null||$tmp==='' ? '' : $tmp);?>
</div>

<?php echo $_smarty_tpl->tpl_vars['onDocFormPrerender']->value;?>

<?php if ($_smarty_tpl->tpl_vars['resource']->value->richtext && $_smarty_tpl->tpl_vars['_config']->value['use_editor']) {?>
    <?php echo $_smarty_tpl->tpl_vars['onRichTextEditorInit']->value;?>

<?php }
}
}
